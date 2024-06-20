import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";
import { z } from "zod";

const createInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.put(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default createInvite;
