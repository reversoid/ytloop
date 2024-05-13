import { atom } from "jotai";

export const workspaceStartTime = atom(0);

export const workspaceEndTime = atom<number | null>(null);

export const workspaceDelta = atom<number>(0.25);

export const workspaceIsPlaying = atom<boolean>(false);
