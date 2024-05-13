import { project, projectLoops } from "@/entities/project/model";
import { workspaceCurrentLoop } from "@/entities/workspace/model";
import { useAtom, useAtomValue } from "jotai";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

/** Sync current loop with project loops */
export const useSyncLoops = () => {
  const currentLoop = useAtomValue(workspaceCurrentLoop);
  const setProjectLoops = useSetAtom(projectLoops);

  useEffect(() => {
    if (!currentLoop) {
      return;
    }

    setProjectLoops((loops) => {
      if (!loops) {
        return [currentLoop];
      }

      const loopIndexToReplace = loops?.findIndex(
        (loop) => loop.id === currentLoop.id
      );

      if (loopIndexToReplace === -1) {
        return [...(loops ?? []), currentLoop];
      }

      const newLoops = [...loops];

      newLoops[loopIndexToReplace] = currentLoop;

      return newLoops;
    });
  }, [currentLoop, setProjectLoops]);
};
