import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../utils/auth-hook.js";
import { canAccessProjectHook } from "../../utils/can-access-project.js";
import { z } from "zod";

const editLoop: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  //   const loopService = fastify.diContainer.resolve("loopService");

  fastify.patch(
    "/:projectId/loops/:loopId",
    {
      preHandler: [authHook, canAccessProjectHook],
      schema: { params: z.object({}) },
    },
    async function (request, reply) {
      return reply.notImplemented();
    }
  );
};

export default editLoop;
