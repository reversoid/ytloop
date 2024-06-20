import { Loop } from "../../models/loop.js";
import { Project } from "../../models/project.js";
import { LoopRepository } from "../../repositories/loop/loop.repository.js";
import { CreateLoopDto, EditLoopDto } from "./types.js";

export class LoopService {
  private readonly loopRepository: LoopRepository;

  constructor({ loopRepository }: { loopRepository: LoopRepository }) {
    this.loopRepository = loopRepository;
  }

  async createLoop(dto: CreateLoopDto): Promise<Loop> {
    return this.loopRepository.createLoop({
      projectId: dto.projectId,
      name: dto.name,
      description: dto.description,
      fromTimeMs: dto.fromTimeMs,
      toTimeMs: dto.toTimeMs,
      bpm: dto.bpm,
    });
  }

  async removeLoop(id: Loop["id"], projectId: Project["id"]) {
    await this.loopRepository.deleteLoop(id, projectId);
  }

  async editLoop(
    id: Loop["id"],
    projectId: Project["id"],
    dto: EditLoopDto
  ): Promise<Loop | null> {
    return this.loopRepository.editLoop(id, projectId, {
      name: dto.name,
      description: dto.description,
      fromTimeMs: dto.fromTimeMs,
      toTimeMs: dto.toTimeMs,
      bpm: dto.bpm,
    });
  }

  async getLoops(projectId: Project["id"]): Promise<Loop[]> {
    return this.loopRepository.getProjectLoops(projectId);
  }
}
