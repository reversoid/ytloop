import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { z } from "zod";
import { canAccessInviteGuard } from "../../../../utils/guards/can-access-invite.guard.js";
import { inivteIdSchema } from "../../../../utils/route-params-schemas/index.js";

const answerInviteSchema = z.object({
  answer: z.enum(["ACCEPT", "REJECT"]),
});

const answerInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.patch(
    "/:inviteId",
    {
      preHandler: [authGuard, canAccessInviteGuard],
      schema: {
        params: z.object({ inviteId: inivteIdSchema }),
        body: answerInviteSchema,
      },
    },
    async function (request, reply) {
      const { answer } = request.body;
      const { inviteId } = request.params;

      if (answer === "ACCEPT") {
        const invite = await inviteService.acceptInvite(inviteId);
        return reply.send({ invite });
      }

      const invite = await inviteService.rejectInvite(inviteId);
      return reply.send({ invite });
    }
  );
};

export default answerInvite;
