import { Loop } from "@/core/models";
import { atom } from "jotai";

export const workspaceDeltaAtom = atom<number>(0.25);

export const workspaceCurrentLoopAtom = atom<Loop | null>(null);

export const workspaceEnabledCountdownAtom = atom<boolean>(false);

export const workspaceContinuePlayingAfterLoopEndsAtom = atom<boolean>(false);
