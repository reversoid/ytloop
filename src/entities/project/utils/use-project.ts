import { ProjectContext } from "@/shared/utils/project-context";
import { useAtomValue } from "jotai";
import { useContext } from "react";
import { project } from "../model";

export const useProjectValue = () => {
  const { project: initialProject } = useContext(ProjectContext);
  const savedProject = useAtomValue(project);

  return (savedProject ?? initialProject)!;
};
