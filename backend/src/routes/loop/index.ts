import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    const loopService = this.diContainer.resolve("loopService");
    const result = loopService.createLoop();
    return result;
  });
};

export default example;
