import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { z } from "zod";
import { canAccessProjectGuard } from "../../../utils/guards/can-access-project.guard.js";

const getInvites: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.get(
    "/accepted",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: {
        params: z.object({
          projectId: z.string().min(10).max(10),
        }),
      },
    },
    async function (request, reply) {
      const { projectId } = request.params;

      const invites = await inviteService.getProjectAcceptedInvites(projectId);

      return reply.send({ invites });
    }
  );

  fastify.get(
    "/waiting",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: {
        params: z.object({
          projectId: z.string().min(10).max(10),
        }),
      },
    },
    async function (request, reply) {
      const { projectId } = request.params;

      const invites = await inviteService.getProjectWaitingInvites(projectId);

      return reply.send({ invites });
    }
  );
};

export default getInvites;
