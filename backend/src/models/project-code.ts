import { z } from "zod";
import { PrismaSelectEntity } from "../utils/db/select-entity.js";

export const projectCodeSchema = z.object({
  code: z.string(),
  permission: z.enum(["R", "RW", "FULL"]),
});

export type ProjectCode = z.infer<typeof projectCodeSchema>;

export type ProjectPermission = ProjectCode["permission"];

export const selectProjectCode: PrismaSelectEntity<ProjectCode> = {
  code: true,
  permission: true,
};
