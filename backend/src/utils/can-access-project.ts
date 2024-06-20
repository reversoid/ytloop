import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const canAccessProjectHook = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!request.session?.userId) {
    throw new Error(
      "No session provided. This hook must be called after auth hook."
    );
  }

  // TODO inject services: 'project-service', 'invite-service'.
  // Check for 'password_correct', 'is_owner', 'has_invite';
};
