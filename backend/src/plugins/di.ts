import fp from "fastify-plugin";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import { diContainer } from "@fastify/awilix";
import { Lifetime, asClass, asValue } from "awilix";
import { LoopRepository } from "../services/loop/loop.repository.js";
import { LoopService } from "../services/loop/loop.service.js";
import { ProjectRepository } from "../services/project/project.repository.js";
import { ProjectService } from "../services/project/project.service.js";
import { UserRepository } from "../services/user/user.repository.js";
import { UserService } from "../services/user/user.service.js";
import { AuthService } from "../services/auth/auth.service.js";
import { AuthTokenService } from "../services/auth/auth-token.service.js";
import fastifyRedis from "@fastify/redis";
import { PrismaClient } from "@prisma/client";

declare module "@fastify/awilix" {
  interface Cradle {
    loopRepository: LoopRepository;
    loopService: LoopService;

    userRepository: UserRepository;
    userService: UserService;

    projectRepository: ProjectRepository;
    projectService: ProjectService;

    authService: AuthService;
    authTokenService: AuthTokenService;

    redisClient: fastifyRedis.FastifyRedis;
    prismaClient: PrismaClient;
  }
}

const initDI = ({
  redisClient,
  prismaClient,
}: {
  redisClient: fastifyRedis.FastifyRedis;
  prismaClient: PrismaClient;
}) => {
  diContainer.register({
    userRepository: asClass(UserRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    userService: asClass(UserService, {
      lifetime: Lifetime.SINGLETON,
    }),

    loopRepository: asClass(LoopRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    loopService: asClass(LoopService, {
      lifetime: Lifetime.SINGLETON,
    }),

    projectRepository: asClass(ProjectRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    projectService: asClass(ProjectService, {
      lifetime: Lifetime.SINGLETON,
    }),

    authService: asClass(AuthService, {
      lifetime: Lifetime.SINGLETON,
    }),

    authTokenService: asClass(AuthTokenService, {
      lifetime: Lifetime.SINGLETON,
    }),

    redisClient: asValue(redisClient),
    prismaClient: asValue(prismaClient),
  });
};

export default fp(
  async (fastify) => {
    fastify.register(fastifyAwilixPlugin, {
      disposeOnClose: true,
      disposeOnResponse: true,
      strictBooleanEnforced: true,
    });

    initDI({ redisClient: fastify.redis, prismaClient: fastify.prisma });
  },
  { dependencies: ["redis", "postgres"] }
);
