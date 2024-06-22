import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authGuard } from "../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../utils/guards/can-access-project.guard.js";
import { z } from "zod";
import { projectPermissionSchema } from "../../../models/project-code.js";
import { projectIdSchema } from "../../../utils/route-params-schemas/index.js";

const createInviteSchema = z.object({
  userEmail: z.string(),
  permission: projectPermissionSchema,
});

const createInvite: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const inviteService = fastify.diContainer.resolve("inviteService");

  fastify.put(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("FULL")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
        body: createInviteSchema,
      },
    },
    async function (request, reply) {
      const { permission, userEmail } = request.body;
      const projectId = request.params.projectId;

      const invite = await inviteService.createInvite({
        userEmail,
        permission,
        projectId,
      });

      return reply.code(201).send({ invite });
    }
  );
};

export default createInvite;
