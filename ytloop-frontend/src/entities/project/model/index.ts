import { Loop, Project } from "@/core/models";
import { atom } from "jotai";

export const projectLoopsAtom = atom<Loop[] | null>(null);

export const projectAtom = atom<Project | null>(null);
