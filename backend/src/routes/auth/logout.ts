import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/logout", async function (request, reply) {
    const authService = fastify.diContainer.resolve("authService");
    const lucia = fastify.diContainer.resolve("lucia");

    const sessionId = lucia.readSessionCookie(request.headers.cookie ?? "");

    if (!sessionId) {
      return;
    }

    await authService.logout({ sessionId: sessionId });

    const blankSessionCookie = lucia.createBlankSessionCookie();
    reply.setCookie(
      blankSessionCookie.name,
      blankSessionCookie.value,
      blankSessionCookie.attributes
    );
  });
};

export default auth;
