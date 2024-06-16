import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/login", async function (request, reply) {});

  fastify.post("/register", async function (request, reply) {});

  fastify.post("/logout", async function (request, reply) {});

  fastify.post("/refresh", async function (request, reply) {});
};

export default auth;
