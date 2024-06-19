import { Project } from "../../models/project.js";
import { User } from "../../models/user.js";

export type CreateProjectDto = {
  name: string;
  userId: User["id"];
  videoId: string;

  id?: Project["id"];
  bpm?: number;
  description?: string;
  password?: string;
  videoSpeed?: string;
};

export type EditProjectDto = {
  name?: string;
  bpm?: number | null;
  description?: string | null;
  password?: string | null;
  videoSpeed?: string;
};
