import { FastifyPluginAsync } from "fastify";
import { authHook } from "../../utils/auth-hook.js";
import { z } from "zod";
import { userSchema } from "../../models/user.js";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ProjectExistsException } from "../../services/project/errors.js";
import { projectSchema } from "../../models/project.js";

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

const editProjectSchema = z.object({
  id: projectSchema.shape.id,
  name: z.string().optional(),
  description: z.string().nullish(),
  bpm: z.number().int().nullish(),
  videoSpeed: z.string().optional(),
  password: z.string().nullish(),
});

const projects: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      preHandler: authHook,
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
          password,
          videoSpeed,
        });
        reply.send({ project });
      } catch (error) {
        if (error instanceof ProjectExistsException) {
          reply.conflict("PROJECT_ALREADY_EXISTS");
        }
        throw error;
      }
    }
  );

  fastify.get(
    "/",
    {
      preHandler: authHook,
    },
    async function (request, reply) {
      const userId = request.session!.userId;

      const projects = await projectService.getProjects(userId);

      return { projects };
    }
  );

  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/:projectId",
      { schema: { params: z.object({ projectId: z.string().min(1) }) } },
      async function (request, reply) {
        const projectId = request.params.projectId;
        const project = await projectService.getProjectByID(projectId);

        if (!project) {
          return reply.notFound();
        }

        // TODO also send loops
        return reply.send({ project });
      }
    );

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/:projectId/fork",
    {
      preHandler: authHook,
      schema: { params: z.object({ projectId: z.string().min(1) }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const userId = request.session!.userId;

      const project = await projectService.forkProject(projectId, userId);
      reply.send({ project });
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().patch(
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

      return project;
    }
  );

  fastify.withTypeProvider<ZodTypeProvider>().delete(
    "/:projectId",
    {
      preHandler: authHook,
      schema: { params: z.object({ projectId: z.string().min(1) }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      await projectService.removeProject(projectId);

      reply.code(204);
    }
  );
};

export default projects;
