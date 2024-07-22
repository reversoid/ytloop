import { FastifyPluginAsync } from "fastify";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getMyProfile: FastifyPluginAsync = async (fastify): Promise<void> => {
  const userService = fastify.diContainer.resolve("userService");

  fastify.get(
    "/",
    { preHandler: [authGuard] },
    async function (request, reply) {
      const userId = request.session?.userId!;

      const user = await userService.getUserById(userId);

      if (!user) {
        throw new Error("No such user");
      }

      return reply.send({ user });
    }
  );
};

export default getMyProfile;
