import { z } from "zod";

export const projectSchema = z.object({});

export type Project = z.infer<typeof projectSchema>;
