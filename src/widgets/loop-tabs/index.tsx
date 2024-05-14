import { projectLoopsAtom } from "@/entities/project/model";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { Tabs } from "@/shared/ui/tabs";
import { useAtom } from "jotai";
import { LoopBlock } from "../loop-block";
import { useSyncLoops } from "./utils/use-sync-loops";

export const LoopTabs = () => {
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  useSyncLoops();

  return (
    <Tabs
      tabs={(projectLoops ?? [])
        ?.map((loop) => ({
          content: <LoopBlock />,
          onSelected: () => setCurrentLoop(loop),
          selected: currentLoop?.id === loop.id,
          title: loop.name,
        }))
        .concat({
          title: "New",
          selected: false,
          content: <></>,
          onSelected: () => {
            const newLoop = createNewLoop({
              postfixNumber: (projectLoops?.length ?? 0) + 1,
            });

            setProjectLoops((loops) => {
              if (!loops) {
                return null;
              }
              return [...loops, newLoop];
            });

            setCurrentLoop(newLoop);
          },
        })}
    ></Tabs>
  );
};
