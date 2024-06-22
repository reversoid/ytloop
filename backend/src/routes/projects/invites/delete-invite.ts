import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";
import {
  inivteIdSchema,
  projectIdSchema,
} from "../../../utils/route-params-schemas/index.js";

const getInvites: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.delete(
    "/:inviteId",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: {
        params: z.object({
          projectId: projectIdSchema,
          inviteId: inivteIdSchema,
        }),
      },
    },
    async function (request, reply) {
      const { inviteId } = request.params;
      await inviteService.removeInvite(inviteId);

      return reply.send();
    }
  );
};

export default getInvites;
