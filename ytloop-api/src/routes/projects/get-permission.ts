import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../utils/guards/can-access-project.guard.js";
import { z } from "zod";
import { projectIdSchema } from "../../utils/route-params-schemas/index.js";

const getPermission: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.get(
    "/:projectId/permission",
    {
      preHandler: [authGuard, canAccessProjectGuard("R")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
      },
    },
    async function (request, reply) {
      const userId = request.session?.userId!;
      const projectId = request.params.projectId;

      const invite = await inviteService.getUserProjectInvite(
        userId,
        projectId
      );

      return reply.send({ permission: invite?.permission ?? null });
    }
  );
};

export default getPermission;
