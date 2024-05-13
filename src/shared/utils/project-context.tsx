import { Project } from "@/entities/project/model";
import { createContext } from "react";

export const ProjectContext = createContext<{
  project?: Project;
}>({});
