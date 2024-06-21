import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { z } from "zod";
import { canAccessInviteGuard } from "../../../utils/guards/can-access-invite.guard.js";

const answerInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.patch(
    "/:inviteId",
    {
      preHandler: [authGuard, canAccessInviteGuard],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default answerInvite;