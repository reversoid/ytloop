import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const getOneProject: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
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
};

export default getOneProject;
