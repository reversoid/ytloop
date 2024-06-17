import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/login",
      { schema: { body: loginSchema } },
      async function (request, reply) {
        // const authService = fastify.diContainer.resolve("authService");
        // TODO body validation
        return true;
      }
    );

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/register",
      { schema: { body: registerSchema } },
      async function (request, reply) {}
    );

  fastify.post("/logout", async function (request, reply) {});
};

export default auth;
