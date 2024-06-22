import {
  FastifyReply,
  FastifyRequest,
  preHandlerAsyncHookHandler,
} from "fastify";
import { ProjectPermission } from "../../models/project-code.js";
import { Project } from "../../models/project.js";
import { ForbiddenException } from "./utils.js";

type AllPermissions = ProjectPermission | "OWNER" | "NONE";

const permissionStrength: Record<AllPermissions, number> = {
  NONE: 0,
  R: 1,
  RW: 2,
  FULL: 3,
  OWNER: 4,
};

const getPermission = async (
  request: FastifyRequest,
  project: Project
): Promise<AllPermissions> => {
  const projectService = request.diScope.resolve("projectService");
  const inviteService = request.diScope.resolve("inviteService");

  if (!request.session?.userId) {
    return project.isPrivate ? "NONE" : "R";
  }

  const userId = request.session.userId;

  if (userId === project.user.id) {
    return "OWNER";
  }

  type PermissionGetter = () => Promise<ProjectPermission | "OWNER" | "NONE">;

  const getPermissionFromInvite: PermissionGetter = async () => {
    const userInvite = await inviteService.getUserProjectInvite(
      userId,
      project.id
    );
    return userInvite?.permission ?? "NONE";
  };

  const getPermissionFromCode: PermissionGetter = async () => {
    const providedCode = (request.query as { code?: string })["code"];

    if (!providedCode) {
      return "NONE";
    }

    const realProjectCode = await projectService.getProjectCode(project.id);
    if (!realProjectCode) {
      return "NONE";
    }

    const { code, permission } = realProjectCode;
    if (code === providedCode) {
      return permission;
    }

    return "NONE";
  };

  let permission: ProjectPermission | "OWNER" | "NONE" = "NONE";

  for (const getPermission of [
    getPermissionFromCode,
    getPermissionFromInvite,
  ]) {
    const currentPermission = await getPermission();
    if (
      permissionStrength[permission] < permissionStrength[currentPermission]
    ) {
      permission = currentPermission;
    }
  }

  return permission;
};

export const canAccessProjectGuard =
  (accessType: Exclude<AllPermissions, "NONE">): preHandlerAsyncHookHandler =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const projectId = request.params as { projectId?: string }["projectId"];

    const projectService = request.diScope.resolve("projectService");

    if (!projectId) {
      throw new Error(
        "No projectId in request params. This hook must be called inside route with ':projectId' parameter."
      );
    }

    const project = await projectService.getProjectByID(projectId);
    if (!project) {
      throw new ForbiddenException();
    }

    const currentPermission = await getPermission(request, project);

    if (
      permissionStrength[currentPermission] >= permissionStrength[accessType]
    ) {
      return;
    }

    throw new ForbiddenException();
  };
