import { z } from "zod";
import { PrismaSelectEntity } from "../utils/db/select-entity.js";
import { selectUser, userSchema } from "./user.js";

export const inviteSchema = z.object({
  id: z.string(),
  user: userSchema,
  projectId: z.string(),
  createdAt: z.date(),
  acceptedAt: z.date().nullable(),
  rejectedAt: z.date().nullable(),
  permission: z.enum(["R", "W", "RW", "FULL"]),
});

export type Invite = z.infer<typeof inviteSchema>;

export const selectInvite: PrismaSelectEntity<Invite> = {
  id: true,
  user: { select: selectUser },
  projectId: true,
  createdAt: true,
  acceptedAt: true,
  rejectedAt: true,
  permission: true,
};
