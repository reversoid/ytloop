import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../../../utils/auth.hook.js";
import { canAccessProjectHook } from "../../../../utils/can-access-project.hook.js";
import { z } from "zod";

const editLoop: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  //   const loopService = fastify.diContainer.resolve("loopService");

  fastify.patch(
    "/:loopId",
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
