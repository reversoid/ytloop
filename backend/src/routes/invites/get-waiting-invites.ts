import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getWaitingInvites: FastifyPluginAsyncZod = async (
  fastify
): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.get(
    "/waiting",
    {
      preHandler: [authGuard],
    },
    async function (request, reply) {
      const userId = request.session?.userId!;

      const invites = await inviteService.getUserWaitingInvites(userId);
      return reply.send({ invites });
    }
  );
};

export default getWaitingInvites;
