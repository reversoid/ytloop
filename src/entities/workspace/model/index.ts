import { Loop } from "@/entities/project/model";
import { atom } from "jotai";

export const workspaceDelta = atom<number>(0.25);

export const workspaceIsPlaying = atom<boolean>(false);

export const workspaceCurrentLoop = atom<Loop | null>(null);
