import { Project } from "../../models/project.js";

export type CreateLoopDto = {
  name: string;
  bpm?: number;
  description?: string;
  fromTimeMs?: number;
  toTimeMs?: number;
  projectId: Project["id"];
};

export type EditLoopDto = {
  name?: string;
  bpm?: number | null;
  description?: string | null;
  fromTimeMs?: number | null;
  toTimeMs?: number | null;
};
