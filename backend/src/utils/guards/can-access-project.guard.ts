import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { forbidden } from "./utils.js";
import { ProjectPermission } from "../../models/project-code.js";

export const canAccessProjectGuard =
  (accessType: ProjectPermission | "OWNER") =>
  async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    const projectId = request.params as { projectId?: string }["projectId"];

    const projectService = request.diScope.resolve("projectService");
    const inviteService = request.diScope.resolve("inviteService");

    if (!projectId) {
      throw new Error(
        "No projectId in request params. This hook must be called inside route with ':projectId' parameter."
      );
    }

    const project = await projectService.getProjectByID(projectId);
    if (!project) {
      return forbidden(done);
    }

    const providedCode = (request.query as { code?: string })["code"];
    if (providedCode) {
      const realProjectCode = await projectService.getProjectCode(project.id);
      if (realProjectCode) {
        const { code, permission } = realProjectCode;

        if (code === providedCode && permission === accessType) {
          return done();
        }
      }
    }

    if (!request.session?.userId) {
      if (!project.isPrivate && accessType === "R") {
        return done();
      }
      return forbidden(done);
    }

    const userId = request.session.userId;

    if (accessType === "OWNER") {
      if (project.user.id === userId) {
        return done();
      }
      return forbidden(done);
    }

    const userInvite = await inviteService.getUserProjectInvite(
      userId,
      project.id
    );
    if (userInvite?.permission === accessType) {
      return done();
    }

    return forbidden(done);
  };
