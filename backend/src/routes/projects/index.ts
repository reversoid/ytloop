import { FastifyPluginAsync } from "fastify";
import { authWithJWT } from "../../utils/auth-with-jwt.js";

const projects: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/",
    { preValidation: authWithJWT() },
    async function (request, reply) {}
  );

  fastify.get("/", async function (request, reply) {});

  fastify.get("/:projectId", async function (request, reply) {});

  fastify.patch("/:projectId", async function (request, reply) {});

  fastify.delete("/:projectId", async function (request, reply) {});
};

export default projects;
