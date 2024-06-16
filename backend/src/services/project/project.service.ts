import { ProjectRepository } from "./project.repository.js";

export class ProjectService {
  private readonly projectRepository: ProjectRepository;

  constructor({ projectRepository }: { projectRepository: ProjectRepository }) {
    this.projectRepository = projectRepository;
    console.log(typeof this.projectRepository);
  }

  async createProject() {}

  async getProjects() {}

  async getProjectByID() {}

  async forkProject() {}

  async removeProject() {}

  async editProject() {}
}
