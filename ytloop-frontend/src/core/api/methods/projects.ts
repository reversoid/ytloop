import { Loop, Project, ProjectCode } from "@/core/models";
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

type EditProjectCodeDto = ProjectCode;

type ProjectWithLoops = {
  project: Project;
  loops: Loop[];
};

export const getProject = (projectId: Project["id"]) =>
  ky.get(`projects/${projectId}`).json<ProjectWithLoops>();

export const createProject = (dto: CreateProjectDto) =>
  ky
    .post("projects", { json: { name: dto.name, videoId: dto.videoId } })
    .json<{ project: Project }>();

export const editProject = (projectId: Project["id"], dto: EditProjectDto) =>
  ky.patch(`projects/${projectId}`, { json: dto }).json<{ project: Project }>();

export const forkProject = (projectId: Project["id"]) =>
  ky.post(`projects/${projectId}/fork`).json<ProjectWithLoops>();

export const deleteProject = (
  projectId: Project["id"],
  dto: CreateProjectDto
) =>
  ky
    .delete(`projects/${projectId}`, { json: dto })
    .json<{ project: Project }>();

export const getProjectCode = (projectId: Project["id"]) =>
  ky.get(`projects/${projectId}/code`).json<{ code: ProjectCode }>();

export const updateProjectCode = (
  projectId: Project["id"],
  dto: EditProjectCodeDto
) =>
  ky
    .get(`projects/${projectId}/code`, { json: dto })
    .json<{ code: ProjectCode }>();
