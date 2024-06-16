import { LoopRepository } from "./services/loop/loop.repository.js";
import { LoopService } from "./services/loop/loop.service.js";
import { ProjectRepository } from "./services/project/project.repository.js";
import { ProjectService } from "./services/project/project.service.js";
import { UserRepository } from "./services/user/user.repository.js";
import { UserService } from "./services/user/user.service.js";

declare module "@fastify/awilix" {
  interface Cradle {
    loopRepository: LoopRepository;
    loopService: LoopService;

    userRepository: UserRepository;
    userService: UserService;

    projectRepository: ProjectRepository;
    projectService: ProjectService;
  }
}
