import { projectLoopsAtom, projectOptionsAtom } from "@/entities/project/model";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { useAtom, useAtomValue } from "jotai";
import { LoopBlock } from "./loop-block";
import { useSyncLoops } from "../utils/use-sync-loops";
import { Tab, Tabs } from "@nextui-org/react";
import { useId } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useAutoSeekStart } from "../utils/use-auto-seek-start";
import { loopColorHash } from "@/shared/utils/loop-color-hash";

export const LoopTabs = () => {
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);
  const projectOptions = useAtomValue(projectOptionsAtom);
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  const newTabKey = useId();

  useSyncLoops();
  useAutoSeekStart();

  const handleNewLoop = () => {
    const newLoop = createNewLoop({
      postfixNumber: (projectLoops?.length ?? 0) + 1,
      bpm: projectOptions?.bpm,
    });

    setProjectLoops((loops) => {
      if (!loops) {
        return null;
      }
      return [...loops, newLoop];
    });

    setCurrentLoop(newLoop);
  };

  return (
    <Tabs
      size="lg"
      className="overflow-auto"
      classNames={{ base: "overflow-auto w-full" }}
      selectedKey={currentLoop?.id}
      onSelectionChange={(key) => {
        if (key === newTabKey) {
          handleNewLoop();
        } else {
          setCurrentLoop(projectLoops?.find((l) => l.id === key) ?? null);
        }
      }}
    >
      {projectLoops?.map((loop) => (
        <Tab
          title={
            <div className="flex gap-2 items-center">
              <div
                style={{ background: loopColorHash.hex(loop.id) }}
                className="w-2 h-2 rounded-lg"
              ></div>
              {loop.name}
            </div>
          }
          key={loop.id}
        >
          <LoopBlock />
        </Tab>
      ))}

      <Tab title={<IconPlus />} key={newTabKey}></Tab>
    </Tabs>
  );
};
