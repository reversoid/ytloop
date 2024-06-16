import { diContainer } from "@fastify/awilix";
import { Lifetime, asClass } from "awilix";
import { LoopRepository } from "./services/loop/loop.repository.js";
import { LoopService } from "./services/loop/loop.service.js";
import { ProjectRepository } from "./services/project/project.repository.js";
import { ProjectService } from "./services/project/project.service.js";
import { UserRepository } from "./services/user/user.repository.js";
import { UserService } from "./services/user/user.service.js";

export const initDI = () => {
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
  });
};
