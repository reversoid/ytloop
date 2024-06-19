import { PrismaClient } from "@prisma/client";
import { createIdGenerator } from "../../utils/create-id.js";
import { CreateProjectDto, EditProjectDto } from "./types.js";
import { Project, selectProject } from "../../models/project.js";
import { User } from "../../models/user.js";

export class ProjectRepository {
  private readonly prismaClient: PrismaClient;

  private generateId = createIdGenerator("project");

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    return this.prismaClient.project.create({
      select: selectProject,
      data: {
        id: dto.id ?? this.generateId(),
        name: dto.name,
        videoId: dto.videoId,
        bpm: dto.bpm,
        description: dto.description,
        password: dto.password,
        userId: dto.userId,
        videoSpeed: dto.videoSpeed,
      },
    });
  }

  async editProject(
    id: Project["id"],
    dto: EditProjectDto
  ): Promise<Project | null> {
    return this.prismaClient.project.update({
      data: {
        bpm: dto.bpm,
        description: dto.description,
        name: dto.name,
        videoSpeed: dto.videoSpeed,
        password: dto.password,
      },
      where: { id },
      select: selectProject,
    });
  }

  async deleteProject(id: Project["id"]) {
    await this.prismaClient.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getProject(id: Project["id"]): Promise<Project | null> {
    return this.prismaClient.project.findUnique({
      where: { id },
      select: selectProject,
    });
  }

  async getUserProjects(userId: User["id"]): Promise<Project[]> {
    return this.prismaClient.project.findMany({
      where: { userId, deletedAt: null },
      select: selectProject,
    });
  }
}
