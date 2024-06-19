import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authHook } from "../../utils/auth-hook.js";

const getUserProjects: FastifyPluginAsyncZod = async (fastify) => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
    "/",
    {
      preHandler: authHook,
    },
    async function (request, reply) {
      const userId = request.session!.userId;

      const projects = await projectService.getProjects(userId);

      return reply.send({ projects });
    }
  );
};

export default getUserProjects;
