import { Project, ProjectCode } from "@/core/models";
import { ky } from "../uitls/ky";

type EditProjectCodeDto = ProjectCode;

export const getProjectCode = (projectId: Project["id"]) =>
  ky.get(`projects/${projectId}/code`).json<{ code: ProjectCode }>();

export const updateProjectCode = (
  projectId: Project["id"],
  dto: EditProjectCodeDto
) =>
  ky
    .get(`projects/${projectId}/code`, { json: dto })
    .json<{ code: ProjectCode }>();
