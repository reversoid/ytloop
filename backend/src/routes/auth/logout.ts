import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/logout", async function (request, reply) {
    const authService = fastify.diContainer.resolve("authService");
    const lucia = fastify.diContainer.resolve("lucia");

    const sessionId = request.session?.id;

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
