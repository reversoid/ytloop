import { z } from "zod";
import { projectSchema } from "./project.js";
import { userSchema } from "./user.js";

export const projectInviteSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  project: projectSchema,
  user: userSchema,
});

export type ProjectInvite = z.infer<typeof projectInviteSchema>;
