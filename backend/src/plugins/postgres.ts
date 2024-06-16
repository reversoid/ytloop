import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";

export default fp(
  async (fastify) => {
    fastify.register(fastifyPostgres, {
      connectionString: fastify.config.POSTGRES_URL,
    });
  },
  { name: "postgres", dependencies: ["env"] }
);
