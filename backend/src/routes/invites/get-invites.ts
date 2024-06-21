import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getInvites: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.patch(
    "/",
    {
      preHandler: [authGuard],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default getInvites;
