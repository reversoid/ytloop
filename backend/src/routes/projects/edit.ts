import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { projectSchema } from "../../models/project.js";
import { z } from "zod";
import { authHook } from "../../utils/auth-hook.js";

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
      preHandler: authHook,
      schema: { body: editProjectSchema },
    },
    async function (request, reply) {
      const { id, bpm, description, name, password, videoSpeed } = request.body;

      const project = await projectService.editProject(id, {
        bpm,
        description,
        name,
        password,
        videoSpeed,
      });

      reply.send({ project });
    }
  );
};

export default editProject;
