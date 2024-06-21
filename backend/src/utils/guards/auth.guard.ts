import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const authGuard = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (!request.session?.id) {
    done({
      code: "401",
      message: "UNAUTHORIZED",
      name: "AUTH",
      statusCode: 401,
    });
  }
  done();
};
