import { ZodSchema, z } from "zod";
import { Loop, Project } from "../model";

export const loopSchema: ZodSchema<Loop> = z.object({
  id: z.string(),
  name: z.string(),
  from: z.coerce.number().min(0).optional(),
  to: z.coerce.number().optional(),
  description: z.string().optional(),
  bpm: z.number().min(1).optional(),
});

export const optionsSchema = z.object({
  bpm: z.coerce.number().min(1).optional(),
  videoSpeed: z.coerce.number().optional(),
});

export const projectSchema: ZodSchema<Project> = z.object({
  id: z.string(),
  loops: z.array(loopSchema).min(1),
  name: z.string(),
  description: z.string().optional(),
  videoId: z.string(),
  options: optionsSchema.optional(),
});
