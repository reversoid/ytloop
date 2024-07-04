import { ProjectPermission } from "../../models/project-code.js";
import { User } from "../../models/user.js";

export type CreateProjectDto = {
  name: string;
  userId: User["id"];
  videoId: string;

  id?: string;
  bpm?: number;
  description?: string;
  code?: {
    value: string;
    permission: ProjectPermission;
  };
  isPrivate?: boolean;
  videoSpeed?: string;
};

export type EditProjectDto = {
  name?: string;
  bpm?: number | null;
  description?: string | null;
  code?: {
    value: string;
    permission: ProjectPermission;
  };
  videoSpeed?: string;
  isPrivate?: boolean;
};

export type EditProjectCode = {
  value: string;
  permission: ProjectPermission;
};
