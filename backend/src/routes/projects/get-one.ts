import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const getOneProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");
  const loopService = fastify.diContainer.resolve("loopService");

  fastify.get(
    "/:projectId",
    {
      schema: { params: z.object({ projectId: z.string().min(10).max(10) }) },
      preHandler: [],
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const project = await projectService.getProjectByID(projectId);

      if (!project) {
        return reply.notFound();
      }

      const loops = await loopService.getLoops(project.id);

      return reply.send({ project, loops });
    }
  );
};

export default getOneProject;
