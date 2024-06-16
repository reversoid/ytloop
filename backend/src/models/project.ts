import { z } from "zod";
import { userSchema } from "./user.js";

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
