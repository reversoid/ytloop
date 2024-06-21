import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { forbidden } from "./utils.js";

export const canAccessInviteGuard = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!request.session?.userId) {
    throw new Error(
      "No session provided. This hook must be called after auth hook."
    );
  }

  const userId = request.session.userId;

  const inviteId = (request.params as { inviteId?: string })["inviteId"];

  if (!inviteId) {
    throw new Error(
      "No inviteId in request params. This hook must be called inside route with ':inviteId' parameter."
    );
  }

  const inviteService = request.diScope.resolve("inviteService");

  const invite = await inviteService.getInvite(inviteId);

  if (invite?.user.id === userId) {
    return done();
  }

  return forbidden(done);
};
