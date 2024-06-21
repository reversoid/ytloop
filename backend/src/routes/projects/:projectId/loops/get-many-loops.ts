import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";

const getManyLoops: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.get(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: {
        params: z.object({
          projectId: z.string().min(10).max(10),
        }),
      },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const loops = await loopService.getLoops(projectId);

      return reply.send({ loops });
    }
  );
};

export default getManyLoops;
