import { projectLoopsAtom } from "@/entities/project/model";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { Tab, Tabs } from "@/shared/ui/tabs";
import { useAtom } from "jotai";
import { LoopBlock } from "../loop-block";
import { useSyncLoops } from "./utils/use-sync-loops";

export const LoopTabs = () => {
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  useSyncLoops();

  return (
    <Tabs>
      {projectLoops?.map((loop) => {
        return (
          <Tab
            title={loop.name}
            selected={currentLoop?.id === loop.id}
            key={loop.id}
            onSelected={() => {
              setCurrentLoop(loop);
            }}
          >
            <LoopBlock />
          </Tab>
        );
      })}

      <Tab
        title="New"
        selected={false}
        onSelected={() => {
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
        }}
      ></Tab>
    </Tabs>
  );
};
