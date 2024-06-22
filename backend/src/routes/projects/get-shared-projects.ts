import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getSharedProjects: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
    "/shared",
    {
      preHandler: [authGuard],
    },
    async function (request, reply) {
      const userId = request.session!.userId;

      const projects = await projectService.getSharedProjects(userId);

      return reply.send({ projects });
    }
  );
};

export default getSharedProjects;
