import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { forbidden } from "./utils.js";

export const validProjectCodeGuard = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const projectId = (request.params as { projectId?: string })["projectId"];

  if (!projectId) {
    throw new Error(
      "No projectId in request params. This hook must be called inside route with ':projectId' parameter."
    );
  }

  const projectService = request.diScope.resolve("projectService");

  const providedCode = (request.query as { code?: string })["code"];
  if (!providedCode) {
    return forbidden(done);
  }

  const realProjectCode = await projectService.getProjectCode(projectId);

  if (realProjectCode === providedCode) {
    return done();
  }

  return forbidden(done);
};
