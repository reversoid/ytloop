import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { z } from "zod";
import { canAccessProjectGuard } from "../../../utils/guards/can-access-project.guard.js";

const getInvites: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.get(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default getInvites;
