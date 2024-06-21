import { z } from "zod";
import { selectUser, userSchema } from "./user.js";
import { PrismaSelectEntity } from "../utils/db/select-entity.js";
import { Prisma } from "@prisma/client";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  videoId: z.string(),
  bpm: z.number().int().nullable(),
  videoSpeed: z.custom((v) => new Prisma.Decimal(v)),
  createdAt: z.date(),
  isPrivate: z.boolean(),
  user: userSchema,
});

export type Project = z.infer<typeof projectSchema>;

export const selectProject: PrismaSelectEntity<Project> = {
  bpm: true,
  createdAt: true,
  description: true,
  id: true,
  name: true,
  videoId: true,
  videoSpeed: true,
  isPrivate: true,
  user: {
    select: selectUser,
  },
};
