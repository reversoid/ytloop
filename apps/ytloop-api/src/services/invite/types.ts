import { ProjectPermission } from "../../models/project-code.js";
import { Project } from "../../models/project.js";

export type CreateInviteDto = {
  userEmail: string;
  projectId: Project["id"];
  permission: ProjectPermission;
};
