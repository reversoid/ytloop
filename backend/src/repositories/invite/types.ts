import { Project } from "../../models/project.js";
import { User } from "../../models/user.js";

export type InvitePermission = "R" | "RW" | "FULL";

export type CreateInviteDto = {
  userId: User["id"];
  projectId: Project["id"];
  permission: InvitePermission;
};
