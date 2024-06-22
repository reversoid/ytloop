import { PrismaClient } from "@prisma/client";
import { IdGenerator } from "../../utils/db/create-id.js";
import { CreateProjectDto, EditProjectDto } from "./types.js";
import { Project, selectProject } from "../../models/project.js";
import { User } from "../../models/user.js";
import { ProjectCode } from "../../models/project-code.js";

export class ProjectRepository {
  private readonly prismaClient: PrismaClient;

  private idGenerator = new IdGenerator("project");

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createProject(dto: CreateProjectDto): Promise<Project> {
    return this.prismaClient.$transaction(async (tx) => {
      const project = await tx.project.create({
        select: selectProject,
        data: {
          id: dto.id ?? this.idGenerator.generateId(),
          name: dto.name,
          videoId: dto.videoId,
          bpm: dto.bpm,
          description: dto.description,
          userId: dto.userId,
          videoSpeed: dto.videoSpeed,
          isPrivate: dto.isPrivate,
        },
      });

      if (dto.code) {
        await tx.projectCode.create({
          data: {
            code: dto.code.value,
            permission: dto.code.permission,
            projectId: project.id,
          },
        });
      }

      return project;
    });
  }

  async editProject(
    id: Project["id"],
    dto: EditProjectDto
  ): Promise<Project | null> {
    return this.prismaClient.$transaction(async (tx) => {
      if (dto.code) {
        const { permission, value } = dto.code;
        await tx.projectCode.upsert({
          create: { code: value, permission, projectId: id },
          update: { code: value, permission },
          where: { projectId: id },
        });
      }

      return tx.project.update({
        data: {
          bpm: dto.bpm,
          description: dto.description,
          name: dto.name,
          videoSpeed: dto.videoSpeed,
          isPrivate: dto.isPrivate,
        },
        where: { id },
        select: selectProject,
      });
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

  async getProjectCode(id: Project["id"]): Promise<ProjectCode | null> {
    return this.prismaClient.projectCode.findUnique({
      where: { projectId: id },
    });
  }

  async getUserProjects(userId: User["id"]): Promise<Project[]> {
    return this.prismaClient.project.findMany({
      where: { userId, deletedAt: null },
      select: selectProject,
    });
  }

  async getSharedUserProjects(userId: User["id"]): Promise<Project[]> {
    return this.prismaClient.projectInvite
      .findMany({
        where: { userId, acceptedAt: { not: null } },
        select: { project: { select: selectProject } },
      })
      .then((r) => r.map((invite) => invite.project));
  }
}
