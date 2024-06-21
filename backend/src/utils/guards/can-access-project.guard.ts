import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const canAccessProjectGuard = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!request.session?.userId) {
    throw new Error(
      "No session provided. This hook must be called after auth hook."
    );
  }

  const projectId = request.params as { projectId?: string }["projectId"];

  if (!projectId) {
    throw new Error(
      "No projectId in request. This hook must be called inside route with ':projectId' parameter."
    );
  }

  const projectService = request.diScope.resolve("projectService");
  const inviteService = request.diScope.resolve("inviteService");

  const userId = request.session.userId;

  const forbidden = () => {
    done({
      code: "403",
      message: "FORBIDDEN",
      name: "IS_CAN_ACCESS_PROJECT",
      statusCode: 403,
    });
  };

  const project = await projectService.getProjectByID(projectId);
  if (!project) {
    return forbidden();
  }

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
