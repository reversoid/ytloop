import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";
import { prismaClient } from "../db/prisma-client.js";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(
  async (fastify) => {
    const dbAdapter = new PrismaAdapter(
      prismaClient.session,
      prismaClient.user
    );

    const lucia = new Lucia(dbAdapter, {
      sessionCookie: {
        name: "session",
        expires: false,
        attributes: {
          secure: fastify.config.MODE !== "dev",
          sameSite: "strict",
        },
      },
      sessionExpiresIn: new TimeSpan(60, "d"),
    });

    fastify.decorate("lucia", lucia);
  },

  { name: "lucia", dependencies: ["env"] }
);

declare module "fastify" {
  export interface FastifyInstance {
    lucia: Lucia<Record<never, never>, Record<never, never>>;
  }
}
