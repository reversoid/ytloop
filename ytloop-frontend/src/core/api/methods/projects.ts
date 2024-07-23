import { Loop, Project, ProjectCode, ProjectPermission } from "@/core/models";
import { ky } from "../uitls/ky";

type CreateProjectDto = {
  videoId: string;
  name: string;
};

type EditProjectDto = {
  name?: string;
  description?: string | null;
  bpm?: number | null;
  videoSpeed?: `${number}.${number}${number}`;
  isPrivate?: boolean;
  code?: ProjectCode;
};

type ProjectWithLoops = {
  project: Project;
  loops: Loop[];
};

export const getProject = (projectId: Project["id"]) =>
  ky
    .get(`projects/${projectId}`)
    .json<ProjectWithLoops & { permission: ProjectPermission | null }>();

export const createProject = (dto: CreateProjectDto) =>
  ky.post("projects", { json: dto }).json<{ project: Project }>();

export const editProject = (projectId: Project["id"], dto: EditProjectDto) =>
  ky.patch(`projects/${projectId}`, { json: dto }).json<{ project: Project }>();

export const forkProject = (projectId: Project["id"]) =>
  ky.post(`projects/${projectId}/fork`).json<ProjectWithLoops>();

export const getProjectPermission = (projectId: Project["id"]) =>
  ky
    .get(`projects/${projectId}/permission`)
    .json<{ permission: ProjectPermission | null }>();

export const deleteProject = (
  projectId: Project["id"],
  dto: CreateProjectDto
) =>
  ky
    .delete(`projects/${projectId}`, { json: dto })
    .json<{ project: Project }>();
