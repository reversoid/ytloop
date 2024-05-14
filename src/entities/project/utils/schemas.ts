import { ZodSchema, z } from "zod";
import { Project } from "../model";

export const loopSchema = z.object({
  id: z.string(),
  name: z.string(),
  from: z.coerce.number().optional(),
  to: z.coerce.number().optional(),
  description: z.string().optional(),
});

export const optionsSchema = z
  .object({
    bpm: z.coerce.number().optional(),
    videoSpeed: z.coerce.number().optional(),
  })
  .optional();

export const projectSchema: ZodSchema<Project> = z.object({
  id: z.string(),
  loops: z.array(loopSchema),
  name: z.string(),
  videoId: z.string(),
  options: optionsSchema,
});
