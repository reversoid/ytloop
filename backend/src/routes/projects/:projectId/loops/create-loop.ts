import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";
import { projectSchema } from "../../../../models/project.js";
import { projectIdSchema } from "../../../../utils/route-params-schemas/index.js";

const createLoopSchema = z.object({
  name: z.string(),
  projectId: projectSchema.shape.id,
  bpm: z.number().int().optional(),
  description: z.string().optional(),
  fromTimeMs: z.number().int().optional(),
  toTimeMs: z.number().int().optional(),
});

const createLoop: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.post(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("RW")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
        body: createLoopSchema,
      },
    },
    async function (request, reply) {
      const { name, projectId, bpm, description, fromTimeMs, toTimeMs } =
        request.body;

      const loop = await loopService.createLoop({
        name,
        projectId,
        bpm,
        description,
        fromTimeMs,
        toTimeMs,
      });

      return reply.status(201).send({ loop });
    }
  );
};

export default createLoop;
