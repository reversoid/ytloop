import { ProjectCode } from "../../models/project-code.js";
import { Project } from "../../models/project.js";
import { User } from "../../models/user.js";
import { ProjectRepository } from "../../repositories/project/project.repository.js";
import { ProjectExistsException } from "./errors.js";
import { CreateProjectDto, EditProjectDto } from "./types.js";

export class ProjectService {
  private readonly projectRepository: ProjectRepository;

  constructor({ projectRepository }: { projectRepository: ProjectRepository }) {
    this.projectRepository = projectRepository;
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    if (dto.id && (await this.projectRepository.getProject(dto.id))) {
      throw new ProjectExistsException();
    }

    const newProject = await this.projectRepository.createProject({
      id: dto.id,
      name: dto.name,
      userId: dto.userId,
      videoId: dto.videoId,
      bpm: dto.bpm,
      description: dto.description,
      code: dto.code,
      videoSpeed: dto.videoSpeed,
      isPrivate: dto.isPrivate,
    });

    return newProject;
  }

  async getProjects(userId: User["id"]): Promise<Project[]> {
    return this.projectRepository.getUserProjects(userId);
  }

  async getProjectsByIds(
    ...projectIds: Array<Project["id"]>
  ): Promise<Project[]> {
    return this.projectRepository.getManyProjects(...projectIds);
  }

  async getSharedProjects(userId: User["id"]): Promise<Project[]> {
    return this.projectRepository.getSharedUserProjects(userId);
  }

  async getProjectByID(id: Project["id"]): Promise<Project | null> {
    return this.projectRepository.getProject(id);
  }

  async getProjectCode(id: Project["id"]): Promise<ProjectCode | null> {
    return this.projectRepository.getProjectCode(id);
  }

  async forkProject(
    id: Project["id"],
    userId: User["id"]
  ): Promise<Project | null> {
    const existingProject = await this.getProjectByID(id);

    if (!existingProject) {
      return null;
    }

    return this.createProject({
      userId,
      name: existingProject.name,
      videoId: existingProject.videoId,
      bpm: existingProject.bpm ?? undefined,
      description: existingProject.description ?? undefined,
      videoSpeed: existingProject.videoSpeed,
    });
  }

  async removeProject(id: Project["id"]): Promise<void> {
    await this.projectRepository.deleteProject(id);
  }

  async editProject(
    projectId: Project["id"],
    dto: EditProjectDto
  ): Promise<Project | null> {
    return this.projectRepository.editProject(projectId, {
      name: dto.name,
      bpm: dto.bpm,
      description: dto.description,
      code: dto.code,
      videoSpeed: dto.videoSpeed,
      isPrivate: dto.isPrivate,
    });
  }
}
