import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authHook } from "../../utils/auth-hook.js";

const projects: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.delete(
    "/:projectId",
    {
      preHandler: authHook,
      schema: { params: z.object({ projectId: z.string().min(1) }) },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      await projectService.removeProject(projectId);

      reply.code(204);
    }
  );
};

export default projects;
