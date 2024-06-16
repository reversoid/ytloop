import { z } from "zod";
import { selectUser, userSchema } from "./user.js";
import { PrismaSelectEntity } from "../utils/select-entity.js";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  videoId: z.string(),
  bpm: z.number().int(),
  videoSpeed: z.string(),
  password: z.string().nullable(),
  createdAt: z.date(),
  user: userSchema,
});

export type Project = z.infer<typeof projectSchema>;

export const selectProject: PrismaSelectEntity<Project> = {
  bpm: true,
  createdAt: true,
  description: true,
  id: true,
  name: true,
  password: true,
  videoId: true,
  videoSpeed: true,
  user: {
    select: selectUser,
  },
};
