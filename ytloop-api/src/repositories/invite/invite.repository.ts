import { PrismaClient } from "@prisma/client";
import { Invite, selectInvite } from "../../models/invite.js";
import { IdGenerator } from "../../utils/db/create-id.js";
import { CreateInviteDto } from "./types.js";
import { User } from "../../models/user.js";
import { Project } from "../../models/project.js";

export class InviteRepository {
  private readonly prismaClient: PrismaClient;

  private idGenerator = new IdGenerator("invite");

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createInvite(dto: CreateInviteDto): Promise<Invite> {
    return this.prismaClient.projectInvite.create({
      data: {
        id: this.idGenerator.generateId(),
        projectId: dto.projectId,
        userId: dto.userId,
        permission: dto.permission,
      },
      select: selectInvite,
    });
  }

  async getInvite(id: Invite["id"]): Promise<Invite | null> {
    return this.prismaClient.projectInvite.findUnique({
      where: { id },
      select: selectInvite,
    });
  }

  async acceptInvite(inviteId: Invite["id"]): Promise<Invite> {
    return this.prismaClient.projectInvite.update({
      data: {
        acceptedAt: new Date(),
        rejectedAt: null,
      },
      where: { id: inviteId },
      select: selectInvite,
    });
  }

  async rejectInvite(inviteId: Invite["id"]): Promise<Invite> {
    return this.prismaClient.projectInvite.update({
      data: {
        acceptedAt: null,
        rejectedAt: new Date(),
      },
      where: { id: inviteId },
      select: selectInvite,
    });
  }

  async removeInvite(id: Invite["id"]) {
    await this.prismaClient.projectInvite.deleteMany({
      where: { id },
    });
  }

  async removeUserProjectInvite(userId: User["id"], projectId: Project["id"]) {
    await this.prismaClient.projectInvite.deleteMany({
      where: { userId, projectId },
    });
  }

  async getUserInviteToProject(
    userId: User["id"],
    projectId: Project["id"]
  ): Promise<Invite | null> {
    return this.prismaClient.projectInvite.findUnique({
      where: { userId_projectId: { projectId, userId } },
      select: selectInvite,
    });
  }

  async getUserAcceptedInvites(userId: User["id"]): Promise<Invite[]> {
    return this.prismaClient.projectInvite.findMany({
      where: { acceptedAt: { not: null }, userId },
      select: selectInvite,
    });
  }

  async getUserWaitingInvites(userId: User["id"]): Promise<Invite[]> {
    return this.prismaClient.projectInvite.findMany({
      where: { acceptedAt: null, rejectedAt: null, userId },
      select: selectInvite,
    });
  }

  async getProjectAcceptedInvites(projectId: Project["id"]): Promise<Invite[]> {
    return this.prismaClient.projectInvite.findMany({
      where: { projectId, acceptedAt: { not: null } },
      select: selectInvite,
    });
  }

  async getProjectWaitingInvites(projectId: Project["id"]): Promise<Invite[]> {
    return this.prismaClient.projectInvite.findMany({
      where: { projectId, acceptedAt: null, rejectedAt: null },
      select: selectInvite,
    });
  }

  async getProjectRejectedInvites(projectId: Project["id"]): Promise<Invite[]> {
    return this.prismaClient.projectInvite.findMany({
      where: { projectId, rejectedAt: { not: null } },
      select: selectInvite,
    });
  }
}
