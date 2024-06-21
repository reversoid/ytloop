import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";

const editLoopSchema = z.object({
  name: z.string().optional(),
  bpm: z.number().int().nullish(),
  description: z.string().nullish(),
  fromTimeMs: z.number().nullish(),
  toTimeMs: z.number().nullish(),
});

const editLoop: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.patch(
    "/:loopId",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: {
        params: z.object({
          projectId: z.string().min(10).max(10),
          loopId: z.coerce.number().int(),
        }),
        body: editLoopSchema,
      },
    },
    async function (request, reply) {
      const loopId = request.params.loopId;
      const projectId = request.params.projectId;

      const { bpm, description, fromTimeMs, name, toTimeMs } = request.body;

      const loop = await loopService.editLoop(loopId, projectId, {
        bpm,
        description,
        fromTimeMs,
        toTimeMs,
        name,
      });
      return reply.send(loop);
    }
  );
};

export default editLoop;
