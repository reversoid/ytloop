import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";

const deleteLoop: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.delete(
    "/:loopId",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: {
        params: z.object({
          projectId: z.string().min(10).max(10),
          loopId: z.coerce.number().int(),
        }),
      },
    },
    async function (request, reply) {
      const { loopId, projectId } = request.params;
      await loopService.removeLoop(loopId, projectId);

      return reply.status(204);
    }
  );
};

export default deleteLoop;
