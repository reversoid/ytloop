import { PrismaClient } from "@prisma/client";
import { IdGenerator } from "../../utils/db/create-id.js";
import { CreateProjectDto, EditProjectDto } from "./types.js";
import { Project, selectProject } from "../../models/project.js";
import { User } from "../../models/user.js";

export class ProjectRepository {
  private readonly prismaClient: PrismaClient;

  private idGenerator = new IdGenerator("project");

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    return this.prismaClient.project.create({
      select: selectProject,
      data: {
        id: dto.id ?? this.idGenerator.generateId(),
        name: dto.name,
        videoId: dto.videoId,
        bpm: dto.bpm,
        description: dto.description,
        code: dto.code,
        userId: dto.userId,
        videoSpeed: dto.videoSpeed,
        isPrivate: dto.isPrivate,
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
        code: dto.code,
        isPrivate: dto.isPrivate,
      },
      where: { id },
      select: selectProject,
    });
  }

  async deleteProject(id: Project["id"]) {
    await this.prismaClient.project.updateMany({
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

  async getProjectCode(id: Project["id"]): Promise<string | null> {
    return (
      (
        await this.prismaClient.project.findUnique({
          where: { id },
          select: { code: true },
        })
      )?.code ?? null
    );
  }

  async getUserProjects(userId: User["id"]): Promise<Project[]> {
    return this.prismaClient.project.findMany({
      where: { userId, deletedAt: null },
      select: selectProject,
    });
  }
}
