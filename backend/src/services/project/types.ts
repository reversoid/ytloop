import { User } from "../../models/user.js";

export type CreateProjectDto = {
  name: string;
  userId: User["id"];
  videoId: string;

  id?: string;
  bpm?: number;
  description?: string;
  code?: string;
  videoSpeed?: string;
};

export type EditProjectDto = {
  name?: string;
  bpm?: number | null;
  description?: string | null;
  code?: string | null;
  videoSpeed?: string;
};
