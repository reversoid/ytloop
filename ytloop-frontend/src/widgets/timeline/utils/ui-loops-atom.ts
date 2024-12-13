import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { atom } from "jotai";

export interface UILoopData {
  loop: ValidLoop;
  textWidth: number;
}

export const UiLoopsAtom = atom<UILoopData[]>([]);
