import { Loop } from "@/core/models";

export type ValidLoop = Loop & { fromTimeMs: number; toTimeMs: number };

export const isLoopValid = (loop: Loop): loop is ValidLoop => {
  return Boolean(
    loop.id && loop.name && loop.fromTimeMs !== null && loop.toTimeMs !== null
  );
};
