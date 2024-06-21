import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { projectSchema } from "../../models/project.js";
import { z } from "zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";

const editProjectSchema = z.object({
  id: projectSchema.shape.id,
  name: z.string().optional(),
  description: z.string().nullish(),
  bpm: z.number().int().nullish(),
  videoSpeed: z.string().optional(),
  password: z.string().nullish(),
});

const editProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.patch(
    "/:projectId",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: {
        params: z.object({ projectId: z.string().min(10).max(10) }),
        body: editProjectSchema,
      },
    },
    async function (request, reply) {
      const { id, bpm, description, name, password, videoSpeed } = request.body;

      const project = await projectService.editProject(id, {
        bpm,
        description,
        name,
        code: password,
        videoSpeed,
      });

      return reply.send({ project });
    }
  );
};

export default editProject;
