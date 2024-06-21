import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { z } from "zod";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";

const forkProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.post(
    "/:projectId/fork",
    {
      preHandler: [authGuard, canAccessProjectGuard],
      schema: { params: z.object({ projectId: z.string().min(1) }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const userId = request.session!.userId;

      const project = await projectService.forkProject(projectId, userId);
      return reply.code(201).send({ project });
    }
  );
};

export default forkProject;
