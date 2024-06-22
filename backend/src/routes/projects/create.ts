import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { z } from "zod";
import { ProjectExistsException } from "../../services/project/errors.js";

const createProjectSchema = z.object({
  name: z.string(),
  videoId: z.string(),
  id: z.string().optional(),
  description: z.string().optional(),
  bpm: z.number().int().optional(),
  videoSpeed: z.string().regex(/\d\.\d\d/, "Must be N.NN format"),
  code: z
    .object({
      value: z.string().min(4).max(16),
      permission: z.enum(["R", "RW", "FULL"]),
    })
    .optional(),
});

const createProject: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.post(
    "/",
    {
      preHandler: [authGuard],
      schema: { body: createProjectSchema },
    },
    async function (request, reply) {
      const { name, videoId, bpm, description, id, videoSpeed, code } =
        request.body;

      const userId = request.session!.userId;

      try {
        const project = await projectService.createProject({
          name,
          userId,
          videoId,
          bpm,
          description,
          id,
          code,
          videoSpeed,
        });
        return reply.code(201).send({ project });
      } catch (error) {
        if (error instanceof ProjectExistsException) {
          return reply.conflict("PROJECT_ALREADY_EXISTS");
        }
        throw error;
      }
    }
  );
};

export default createProject;
