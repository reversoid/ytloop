import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { forbidden } from "./utils.js";

export const canAccessProjectGuard =
  (accessType: "R" | "RW" | "FULL" | "OWNER") =>
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

    if (!request.session?.userId) {
      if (!project.isPrivate) {
        return done();
      }

      const providedCode = (request.query as { code?: string })["code"];
      if (!providedCode) {
        return forbidden(done);
      }

      const realProjectCode = await projectService.getProjectCode(project.id);
      if (realProjectCode === providedCode) {
        return done();
      }

      return forbidden(done);
    }

    const userId = request.session.userId;

    type CanFn = () => Promise<boolean>;

    const userIsProjectCreator: CanFn = async () => {
      return project.user.id === userId;
    };

    const validProjectCode: CanFn = async () => {
      const providedCode = (request.query as { code?: string })["code"];
      if (!providedCode) {
        return false;
      }
      const realProjectCode = await projectService.getProjectCode(project.id);
      return realProjectCode === providedCode;
    };

    const userHasInvite: CanFn = async () => {
      const userInvites = await inviteService.getUserAcceptedInvites(userId);
      return userInvites.some((invite) => invite.projectId === projectId);
    };

    for (const validator of [
      userIsProjectCreator,
      validProjectCode,
      userHasInvite,
    ]) {
      const can = await validator();

      if (can) {
        done();
      }
    }

    return forbidden();
  };
