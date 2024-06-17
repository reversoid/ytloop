import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post("/login", async function (request, reply) {
      // const authService = fastify.diContainer.resolve("authService");
      // TODO body validation
      return true;
    });

  fastify.post("/register", async function (request, reply) {});

  fastify.post("/logout", async function (request, reply) {});

  fastify.post("/refresh", async function (request, reply) {});
};

export default auth;
