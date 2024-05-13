import { Project } from "@/entities/project/model";
import { projectSchema } from "@/entities/project/utils/schemas";
import qs from "qs";

export const projectToQuery = (project: Project) => {
  return qs.stringify(project);
};

export const queryToProject = (query: string): Project | null => {
  const parsedObject = qs.parse(query);

  if (!parsedObject || Object.values(parsedObject).length === 0) {
    return null;
  }

  return projectSchema.safeParse(parsedObject).data ?? null;
};
