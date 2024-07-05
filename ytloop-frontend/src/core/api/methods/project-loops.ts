import { Loop, Project, ProjectCode } from "@/core/models";
import { ky } from "../uitls/ky";

type CreateLoopDto = {
  name: string;
  bpm?: number;
  description?: string;
  fromTimeMs?: number;
  toTimeMs?: number;
};

type EditLoopDto = {
  name?: string;
  bpm?: number | null;
  description?: string | null;
  fromTimeMs?: number | null;
  toTimeMs?: number | null;
};

export const createLoop = (projectId: Project["id"], dto: CreateLoopDto) =>
  ky.post(`projects/${projectId}/loops`, { json: dto }).json<{ loop: Loop }>();

export const editLoop = (projectId: Project["id"], dto: EditLoopDto) =>
  ky.patch(`projects/${projectId}/loops`, { json: dto }).json<{ loop: Loop }>();

export const deleteLoop = (projectId: Project["id"], loopId: Loop["id"]) =>
  ky.delete(`projects/${projectId}/loops/${loopId}`).json<void>();

export const getLoops = (projectId: Project["id"]) =>
  ky.get(`projects/${projectId}/loops`).json<{ loops: Loop[] }>();
