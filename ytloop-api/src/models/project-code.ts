import { z } from "zod";
import { PrismaSelectEntity } from "../utils/db/select-entity.js";

export const projectPermissionSchema = z.enum(["R", "RW", "FULL"]);

export const projectCodeSchema = z.object({
  code: z.string(),
  permission: projectPermissionSchema,
});

export type ProjectCode = z.infer<typeof projectCodeSchema>;

export type ProjectPermission = z.infer<typeof projectPermissionSchema>;

export const selectProjectCode: PrismaSelectEntity<ProjectCode> = {
  code: true,
  permission: true,
};
