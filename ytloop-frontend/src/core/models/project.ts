import { z } from "zod";
import { userSchema } from "./user";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  videoId: z.string(),
  bpm: z.number().int().nullable(),
  videoSpeed: z.string().nullable(),
  createdAt: z.date(),
  isPrivate: z.boolean(),
  deletedAt: z.date().nullable(),
  user: userSchema,
});

export type Project = z.infer<typeof projectSchema>;
