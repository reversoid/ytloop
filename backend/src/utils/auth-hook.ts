import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const authHook = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!request.session?.id) {
    reply.status(401);
    done(new Error("UNAUTHORIZED"));
  }
  done();
};
