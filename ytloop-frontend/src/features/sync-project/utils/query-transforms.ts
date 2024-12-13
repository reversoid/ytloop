import { Loop, loopSchema, Project, projectSchema } from "@/core/models";
import qs from "qs";
import { z } from "zod";

const schema = z.object({
  project: projectSchema,
  loops: z.array(loopSchema),
});

export const projectToQuery = (project: Project, loops: Loop[]) => {
  return qs.stringify({ project, loops });
};

export const queryToProject = (
  query: string
): { project: Project; loops: Loop[] } | null => {
  const parsedObject = qs.parse(query);

  if (!parsedObject || Object.values(parsedObject).length === 0) {
    return null;
  }

  return schema.safeParse(parsedObject).data ?? null;
};
