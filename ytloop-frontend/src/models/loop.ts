import { z } from "zod";

export const loopSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  fromTimeMs: z.number().int().nullable(),
  toTimeMs: z.number().int().nullable(),
  bpm: z.number().int().nullable(),
});

export type Loop = z.infer<typeof loopSchema>;
