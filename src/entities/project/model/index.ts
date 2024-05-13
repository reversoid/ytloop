import { atom } from "jotai";

interface Loop {
  from: number;
  to: number;
}

interface ProjectOptions {
  bpm?: number;
  hideVideoOnStart?: boolean;
  speed?: number;
}

interface Project {
  id: string;
  name: string;
  videoId: string;
  loops: Loop[];
  options: ProjectOptions | null;
}

export const projectId = atom<string | null>(null);

export const projectName = atom<string | null>(null);

export const projectVideoId = atom<string | null>(null);

export const projectLoops = atom<Loop[] | null>(null);

export const projectOptions = atom<ProjectOptions | null>(null);

export const project = atom<Project | null>((get) => {
  const id = get(projectId);
  const name = get(projectName);
  const videoId = get(projectVideoId);
  const loops = get(projectLoops);
  const options = get(projectOptions);

  if (id && name && videoId && loops) {
    return { id, name, videoId, loops, options };
  }

  return null;
});
