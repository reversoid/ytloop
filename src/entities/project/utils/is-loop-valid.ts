import { Loop } from "../model";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ValidLoop = PartialBy<Required<Loop>, "description">;

export const isLoopValid = (loop: Loop): loop is ValidLoop => {
  return Boolean(
    loop.id && loop.name && loop.from !== undefined && loop.to !== undefined
  );
};
