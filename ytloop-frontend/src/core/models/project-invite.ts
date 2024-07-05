import { z } from "zod";
import { projectSchema } from "./project";
import { userSchema } from "./user";

export const projectInviteSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  project: projectSchema,
  user: userSchema.nullable(),
});

export type ProjectInvite = z.infer<typeof projectInviteSchema>;
