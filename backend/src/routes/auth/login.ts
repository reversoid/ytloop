import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  NoUserException,
  WrongCredentialsException,
} from "../../services/auth/errors.js";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/login",
      { schema: { body: loginSchema } },
      async function (request, reply) {
        const authService = fastify.diContainer.resolve("authService");
        const lucia = fastify.diContainer.resolve("lucia");

        const { email, password } = request.body;

        try {
          const { sessionId } = await authService.login({ email, password });
          const cookie = lucia.createSessionCookie(sessionId);
          return reply.setCookie(cookie.name, cookie.value, cookie.attributes);
        } catch (error) {
          if (
            error instanceof WrongCredentialsException ||
            error instanceof NoUserException
          ) {
            return reply.badRequest("WRONG_CREDENTIALS");
          }
        }
      }
    );
};

export default login;
