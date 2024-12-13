import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";
import { projectIdSchema } from "../../../../utils/route-params-schemas/index.js";

const getManyLoops: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.get(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("R")],
      schema: {
        params: z.object({
          projectId: projectIdSchema,
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
