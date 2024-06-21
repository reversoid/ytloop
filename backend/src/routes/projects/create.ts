import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { z } from "zod";
import { userSchema } from "../../models/user.js";
import { ProjectExistsException } from "../../services/project/errors.js";

const createProjectSchema = z.object({
  name: z.string(),
  videoId: z.string(),
  userId: userSchema.shape.id,
  id: z.string().optional(),
  description: z.string().optional(),
  bpm: z.number().int().optional(),
  videoSpeed: z.string().optional(),
  password: z.string().optional(),
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
      const {
        name,
        userId,
        videoId,
        bpm,
        description,
        id,
        password,
        videoSpeed,
      } = request.body;

      try {
        const project = await projectService.createProject({
          name,
          userId,
          videoId,
          bpm,
          description,
          id,
          code: password,
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
