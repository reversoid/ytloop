import { FastifyPluginAsync } from "fastify";

const loops: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {});

  fastify.get("/", async function (request, reply) {});

  fastify.patch("/:loopId", async function (request, reply) {});

  fastify.delete("/:loopId", async function (request, reply) {});
};

export default loops;
