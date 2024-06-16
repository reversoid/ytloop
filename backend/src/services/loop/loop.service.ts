import { LoopRepository } from "../../repositories/loop/loop.repository.js";

export class LoopService {
  private readonly loopRepository: LoopRepository;

  constructor({ loopRepository }: { loopRepository: LoopRepository }) {
    this.loopRepository = loopRepository;
  }

  createLoop() {
    return typeof this.loopRepository;
  }

  removeLoop() {}

  editLoop() {}

  getLoops() {}
}
