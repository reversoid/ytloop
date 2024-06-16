import { LoopRepository } from "./loop.repository.js";

export class LoopService {
  private readonly loopRepository: LoopRepository;

  constructor({ loopRepository }: { loopRepository: LoopRepository }) {
    this.loopRepository = loopRepository;
  }

  createLoop() {}

  removeLoop() {}

  editLoop() {}
}
