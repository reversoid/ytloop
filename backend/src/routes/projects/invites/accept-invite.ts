import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { z } from "zod";

const acceptInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
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

export default acceptInvite;
