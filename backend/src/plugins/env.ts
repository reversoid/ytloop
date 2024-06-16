import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

const envProperties = {
  PORT: { type: "number" },
  POSTGRES_URL: { type: "string" },
  REDIS_URL: { type: "string" },
} as const;

type EnvProperties = {
  [key in keyof typeof envProperties]: (typeof envProperties)[key]["type"] extends infer ValueType
    ? ValueType extends "number"
      ? number
      : ValueType extends "string"
      ? string
      : never
    : never;
};

declare module "fastify" {
  interface FastifyInstance {
    config: EnvProperties;
  }
}

export default fp(
  async (fastify) => {
    await fastify.register(fastifyEnv, {
      schema: {
        type: "object",
        properties: envProperties,
        required: [
          "PORT",
          "POSTGRES_URL",
          "REDIS_URL",
        ] satisfies (keyof typeof envProperties)[],
      },
    });
  },
  { name: "env" }
);