import { projectLoops } from "@/entities/project/model";
import { useProjectValue } from "@/entities/project/utils/use-project";
import { workspaceCurrentLoop } from "@/entities/workspace/model";
import { useAtom, useAtomValue } from "jotai";

export const useLoops = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoop);
  const project = useProjectValue();

  return { projectLoops: project.loops, currentLoop, setCurrentLoop };
};
