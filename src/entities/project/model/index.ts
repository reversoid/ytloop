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
  description?: string;
  videoId: string;
  loops: Loop[];
  options?: ProjectOptions;
}

export const projectIdAtom = atom<string | null>(null);

export const projectNameAtom = atom<string | null>(null);

export const projectDescriptionAtom = atom<string | null>(null);

export const projectVideoIdAtom = atom<string | null>(null);

export const projectLoopsAtom = atom<Loop[] | null>(null);

export const projectOptionsAtom = atom<ProjectOptions | null>(null);

export const projectAtom = atom(
  (get) => {
    const id = get(projectIdAtom);
    const name = get(projectNameAtom);
    const description = get(projectDescriptionAtom);
    const videoId = get(projectVideoIdAtom);
    const loops = get(projectLoopsAtom);
    const options = get(projectOptionsAtom);

    if (id && name && videoId && loops) {
      return {
        id,
        name,
        description: description || undefined,
        videoId,
        loops,
        options: options || undefined,
      };
    }

    return null;
  },
  (_get, set, project: Project) => {
    set(projectIdAtom, project.id);
    set(projectNameAtom, project.name);
    set(projectDescriptionAtom, project.description ?? null);
    set(projectVideoIdAtom, project.videoId);
    set(projectLoopsAtom, project.loops);
    set(projectOptionsAtom, project.options ?? null);
  }
);
