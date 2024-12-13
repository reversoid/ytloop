import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";
import { projectIdSchema } from "../../utils/route-params-schemas/index.js";

const getOneProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.get(
    "/:projectId",
    {
      schema: { params: z.object({ projectId: projectIdSchema }) },
      preHandler: [canAccessProjectGuard("R", true)],
    },
    async function (request, reply) {
      const projectId = request.params.projectId;

      const project = await projectService.getProjectByID(projectId);

      if (!project) {
        return reply.forbidden("FORBIDDEN");
      }

      const loops = await loopService.getLoops(project.id);

      return reply.send({
        project,
        loops,
      });
    }
  );
};

export default getOneProject;
