import { ProjectPermission } from "../../models/project-code.js";
import { Project } from "../../models/project.js";
import { User } from "../../models/user.js";

export type CreateProjectDto = {
  name: string;
  userId: User["id"];
  videoId: string;

  id?: Project["id"];
  bpm?: number;
  description?: string;
  code?: {
    value: string;
    permission: ProjectPermission;
  };
  videoSpeed?: string;
  isPrivate?: boolean;
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
