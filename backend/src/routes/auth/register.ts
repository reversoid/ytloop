import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { UserAlreadyExtistsException } from "../../services/auth/errors.js";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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

          reply.setCookie(cookie.name, cookie.value, {
            ...cookie.attributes,
            signed: true,
          });

          return {};
        } catch (error) {
          if (error instanceof UserAlreadyExtistsException) {
            return reply.badRequest("USER_ALREADY_EXISTS");
          }
        }
      }
    );
};

export default register;
