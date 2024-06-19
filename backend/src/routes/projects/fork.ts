import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../utils/auth-hook.js";
import { z } from "zod";

const forkProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.post(
    "/:projectId/fork",
    {
      preHandler: authHook,
      schema: { params: z.object({ projectId: z.string().min(1) }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const userId = request.session!.userId;

      const project = await projectService.forkProject(projectId, userId);
      reply.code(201).send({ project });
    }
  );
};

export default forkProject;
