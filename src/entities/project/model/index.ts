import { atom } from "jotai";

export interface Loop {
  id: string;
  name: string;
  description?: string;
  from?: number;
  to?: number;
}

export interface ProjectOptions {
  bpm?: number;
  videoSpeed?: number;
}

export interface Project {
  id: string;
  name: string;
  videoId: string;
  loops: Loop[];
  options?: ProjectOptions;
}

export const project = atom<Project | null>(null);

export const projectLoops = atom<Loop[] | null>(
  (get) => get(project)?.loops ?? null
);
