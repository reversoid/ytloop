import { z } from "zod";
import { userSchema } from "./user";

export const inviteSchema = z.object({
  id: z.string(),
  user: userSchema,
  projectId: z.string(),
  createdAt: z.date(),
  acceptedAt: z.date().nullable(),
  rejectedAt: z.date().nullable(),
  permission: z.enum(["R", "RW", "FULL"]),
});

export type Invite = z.infer<typeof inviteSchema>;
