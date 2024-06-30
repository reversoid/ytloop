import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";
import { projectIdSchema } from "../../utils/route-params-schemas/index.js";

const editProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().nullish(),
  bpm: z.number().int().nullish(),
  videoSpeed: z.string().optional(),
  isPrivate: z.boolean().optional(),
  code: z.object({
    value: z.string().min(4).max(16),
    permission: z.enum(["R", "RW", "FULL"]),
  }),
});

const editProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.patch(
    "/:projectId",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
        body: editProjectSchema,
      },
    },
    async function (request, reply) {
      const { bpm, description, name, code, videoSpeed, isPrivate } =
        request.body;

      const projectId = request.params.projectId;
      const project = await projectService.editProject(projectId, {
        bpm,
        description,
        name,
        code,
        videoSpeed,
        isPrivate,
      });

      return reply.send({ project });
    }
  );
};

export default editProject;
