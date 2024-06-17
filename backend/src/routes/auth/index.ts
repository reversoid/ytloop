import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  NoUserException,
  UserAlreadyExtistsException,
  WrongCredentialsException,
} from "../../services/auth/errors.js";

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

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/register",
      { schema: { body: registerSchema } },
      async function (request, reply) {
        const authService = fastify.diContainer.resolve("authService");
        const lucia = fastify.diContainer.resolve("lucia");

        const { email, password, username } = request.body;

        try {
          const { sessionId } = await authService.register({
            email,
            password,
            username,
          });
          const cookie = lucia.createSessionCookie(sessionId);
          return reply.setCookie(cookie.name, cookie.value, cookie.attributes);
        } catch (error) {
          if (error instanceof UserAlreadyExtistsException) {
            return reply.badRequest("USER_ALREADY_EXISTS");
          }
        }
      }
    );

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
