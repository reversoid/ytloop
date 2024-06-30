import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { projectIdSchema } from "../../../../utils/route-params-schemas/index.js";

const getCode: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.get(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("OWNER")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
      },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;

      const code = await projectService.getProjectCode(projectId);
      return reply.send({ code });
    }
  );
};

export default getCode;
