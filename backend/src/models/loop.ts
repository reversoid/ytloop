import { z } from "zod";
import { PrismaSelectEntity } from "../utils/select-entity.js";

export const loopSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  fromTimeMs: z.number().int().nullable(),
  toTimeMs: z.number().int().nullable(),
  bpm: z.number().int().nullable(),
});

export type Loop = z.infer<typeof loopSchema>;

export const selectLoop: PrismaSelectEntity<Loop> = {
  bpm: true,
  description: true,
  fromTimeMs: true,
  id: true,
  name: true,
  toTimeMs: true,
};
