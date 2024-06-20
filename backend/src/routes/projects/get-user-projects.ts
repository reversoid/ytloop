import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getUserProjects: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
    "/",
    {
      preHandler: authGuard,
    },
    async function (request, reply) {
      const userId = request.session!.userId;

      const projects = await projectService.getProjects(userId);

      return reply.send({ projects });
    }
  );
};

export default getUserProjects;
