import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

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

  // TODO implement
};
