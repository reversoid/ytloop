import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const isProjectCreatorGuard = async (
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

  const project = await projectService.getProjectByID(projectId);

  if (project?.user.id === request.session.userId) {
    done();
  }

  done({
    code: "403",
    message: "FORBIDDEN",
    name: "IS_PROJECT_CREATOR",
    statusCode: 403,
  });
};
