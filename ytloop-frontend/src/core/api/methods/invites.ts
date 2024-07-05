import { Invite, Project } from "@/core/models";
import { ky } from "../uitls/ky";

export const answerInvite = (
  projectId: Project["id"],
  inviteId: Invite["id"],
  answer: "ACCEPT" | "REJECT"
) =>
  ky
    .patch(`projects/${projectId}/invites/${inviteId}`, { json: { answer } })
    .json<{ inivte: Invite }>();
