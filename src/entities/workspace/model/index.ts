import { Loop } from "@/entities/project/model";
import { atom } from "jotai";

export const workspaceDeltaAtom = atom<number>(0.25);

export const workspaceIsPlayingAtom = atom<boolean>(false);

export const workspaceCurrentLoopAtom = atom<Loop | null>(null);
