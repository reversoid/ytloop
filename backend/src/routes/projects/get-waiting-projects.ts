import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";

const getWaitingInvites: FastifyPluginAsyncZod = async (
  fastify
): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
    "/waiting",
    {
      preHandler: [authGuard],
    },
    async function (request, reply) {
      const userId = request.session?.userId!;

      const result = await projectService.getUserWaitingProjects(userId);

      return reply.send({ projects: result });
    }
  );
};

export default getWaitingInvites;
