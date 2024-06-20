import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../utils/auth.hook.js";
import { canAccessProjectHook } from "../../utils/can-access-project.hook.js";
import { z } from "zod";

const createInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  fastify.put(
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

export default createInvite;
