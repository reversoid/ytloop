import { z } from "zod";

export const projectPermissionSchema = z.enum(["R", "RW", "FULL"]);

export const projectCodeSchema = z.object({
  code: z.string(),
  permission: projectPermissionSchema,
});

export type ProjectCode = z.infer<typeof projectCodeSchema>;

export type ProjectPermission = z.infer<typeof projectPermissionSchema>;
