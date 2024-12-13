import { Invite, Project } from "@/core/models";
import { ky } from "../uitls/ky";

type CreateInviteDto = {
  userEmail: string;
  permission: Invite["permission"];
};

export const getAcceptedInvites = (projectId: Project["id"]) =>
  ky
    .delete(`projects/${projectId}/invites/accepted`)
    .json<{ invites: Invite[] }>();

export const getWaitingInvites = (projectId: Project["id"]) =>
  ky
    .delete(`projects/${projectId}/invites/waiting`)
    .json<{ invites: Invite[] }>();

export const createInvite = (projectId: Project["id"], dto: CreateInviteDto) =>
  ky
    .put(`projects/${projectId}/invites`, { json: dto })
    .json<{ inivte: Invite }>();

export const deleteInvite = (projectId: Project["id"], inviteId: string) =>
  ky.delete(`projects/${projectId}/invites/${inviteId}`).json<void>();
