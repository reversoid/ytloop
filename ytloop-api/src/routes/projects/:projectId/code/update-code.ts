import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { authGuard } from "../../../../utils/guards/auth.guard.js";
import { canAccessProjectGuard } from "../../../../utils/guards/can-access-project.guard.js";
import { projectIdSchema } from "../../../../utils/route-params-schemas/index.js";

const updateCodeSchema = z.object({
  value: z.string().min(5),
  permission: z.enum(["R", "RW", "FULL"]),
});

const updateCode: FastifyPluginAsyncZod = async (fastify): Promise<void> => {
  const projectService = fastify.diContainer.resolve("projectService");

  fastify.put(
    "/",
    {
      preHandler: [authGuard, canAccessProjectGuard("OWNER")],
      schema: {
        params: z.object({ projectId: projectIdSchema }),
        body: updateCodeSchema,
      },
    },
    async function (request, reply) {
      const projectId = request.params.projectId;
      const { permission, value } = request.body;

      const code = await projectService.editProjectCode(projectId, {
        permission,
        value,
      });

      return reply.send({ code });
    }
  );
};

export default updateCode;
