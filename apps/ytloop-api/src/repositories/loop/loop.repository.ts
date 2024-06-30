import { PrismaClient } from "@prisma/client";
import { CreateLoopDto, EditLoopDto } from "./types.js";
import { Loop, selectLoop } from "../../models/loop.js";
import { Project } from "../../models/project.js";

export class LoopRepository {
  private readonly prismaClient: PrismaClient;

  constructor({ prismaClient }: { prismaClient: PrismaClient }) {
    this.prismaClient = prismaClient;
  }

  async createLoop(dto: CreateLoopDto): Promise<Loop> {
    return this.prismaClient.$transaction(async (tx) => {
      const latestLoop = await tx.loop.findFirst({
        where: { projectId: dto.projectId },
        take: 1,
        orderBy: { id: "desc" },
        select: { id: true },
      });
      const latestLoopId = latestLoop?.id ?? 0;

      const newLoop = await tx.loop.create({
        data: {
          id: latestLoopId + 1,
          name: dto.name,
          projectId: dto.projectId,
          bpm: dto.bpm,
          description: dto.description,
          fromTimeMs: dto.fromTimeMs,
          toTimeMs: dto.toTimeMs,
        },
        select: selectLoop,
      });

      return newLoop;
    });
  }

  async editLoop(
    id: Loop["id"],
    projectId: Project["id"],
    dto: EditLoopDto
  ): Promise<Loop | null> {
    return this.prismaClient.loop
      .update({
        where: { projectId_id: { id, projectId } },
        data: {
          name: dto.name,
          bpm: dto.bpm,
          description: dto.description,
          fromTimeMs: dto.fromTimeMs,
          toTimeMs: dto.toTimeMs,
        },
        select: selectLoop,
      })
      .catch(() => null);
  }

  async deleteLoop(id: Loop["id"], projectId: Project["id"]) {
    await this.prismaClient.loop.deleteMany({
      where: { id, projectId },
    });
  }

  async getProjectLoops(projectId: Project["id"]): Promise<Loop[]> {
    return this.prismaClient.loop.findMany({
      where: { projectId },
      orderBy: { id: "asc" },
      select: selectLoop,
    });
  }
}