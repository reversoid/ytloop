import { Loop } from "@/entities/project/model";
import { ValidLoop, isLoopValid } from "@/entities/project/utils/is-loop-valid";

const doLoopsIntersect = (loop1: ValidLoop, loop2: ValidLoop) => {
  return !(loop1.to <= loop2.from || loop2.to <= loop1.from);
};

export const organizeLoopsIntoGrid = (
  loops: Loop[]
): Array<Array<ValidLoop>> => {
  const sortedLoops = loops
    .filter(isLoopValid)
    .toSorted((a, b) => a.from - b.to);

  const grid: Array<Array<ValidLoop>> = [];

  for (const loop of sortedLoops) {
    let placed = false;

    for (const row of grid) {
      if (!row.some((existingLoop) => doLoopsIntersect(existingLoop, loop))) {
        row.push(loop);
        placed = true;
        break;
      }
    }

    if (!placed) {
      grid.push([loop]);
    }
  }

  return grid;
};
