import { z } from "zod";

export const loopSchema = z.object({});

export type Loop = z.infer<typeof loopSchema>;
