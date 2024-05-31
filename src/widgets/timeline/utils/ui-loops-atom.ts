import { Loop } from "@/entities/project/model";
import { atom } from "jotai";

export interface UILoopData {
  loopId: Loop["id"];
  textWidth: number;
}

export const UiLoopsAtom = atom<UILoopData[]>([]);
