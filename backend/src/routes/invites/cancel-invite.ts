import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../utils/auth.hook.js";
import { canAccessProjectHook } from "../../utils/can-access-project.hook.js";
import { z } from "zod";

const deleteInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.delete(
    "/",
    {
      preHandler: [authHook, canAccessProjectHook],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default deleteInvite;
