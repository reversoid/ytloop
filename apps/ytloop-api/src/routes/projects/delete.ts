import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";
import { projectIdSchema } from "../../utils/route-params-schemas/index.js";

const deleteProject: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.delete(
    "/:projectId",
    {
      preHandler: [authGuard, canAccessProjectGuard("OWNER", true)],
      schema: { params: z.object({ projectId: projectIdSchema }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      await projectService.removeProject(projectId);

      return reply.code(204).send();
    }
  );
};

export default deleteProject;
