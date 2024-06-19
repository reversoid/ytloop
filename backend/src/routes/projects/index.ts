import { FastifyPluginAsync } from "fastify";
import { authHook } from "../../utils/auth-hook.js";

const projects: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/",
    { preHandler: authHook },
    async function (request, reply) {}
  );

  fastify.get("/", async function (request, reply) {});

  fastify.get("/:projectId", async function (request, reply) {});

  fastify.patch("/:projectId", async function (request, reply) {});

  fastify.delete("/:projectId", async function (request, reply) {});
};

export default projects;
