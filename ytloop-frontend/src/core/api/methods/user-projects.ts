import { Invite, Loop, Project, ProjectCode } from "@/core/models";
import { ky } from "../uitls/ky";

export const getSharedProjects = () =>
  ky.get("projects/shared").json<{ projects: Project[] }>();

export const getUserProjects = () =>
  ky.get("projects").json<{ projects: Project[] }>();

export const getUserWaitingProjects = () =>
  ky
    .get("projects")
    .json<{ projects: { project: Project; invite: Invite }[] }>();
