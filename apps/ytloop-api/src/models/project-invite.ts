import { z } from "zod";
import { projectSchema, selectProject } from "./project.js";
import { userSchema } from "./user.js";
import { PrismaSelectEntity } from "../utils/db/select-entity.js";

export const projectInviteSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  project: projectSchema,
  user: userSchema.nullable(),
});

export type ProjectInvite = z.infer<typeof projectInviteSchema>;

export const selectProjectInvite: PrismaSelectEntity<ProjectInvite> = {
  createdAt: true,
  id: true,
  project: { select: selectProject },
  user: true,
};
