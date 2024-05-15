import { projectLoopsAtom } from "@/entities/project/model";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { LoopBlock } from "../loop-block";
import { useSyncLoops } from "./utils/use-sync-loops";
import { Tab, Tabs } from "@nextui-org/react";
import { useId } from "react";
import { IconPlus } from "@tabler/icons-react";

export const LoopTabs = () => {
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  const newTabKey = useId();

  useSyncLoops();

  const handleNewLoop = () => {
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
  };

  return (
    <Tabs
      className="overflow-auto"
      classNames={{ base: "overflow-auto w-full" }}
      size="lg"
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
        <Tab title={loop.name} key={loop.id}>
          <LoopBlock />
        </Tab>
      ))}

      <Tab title={<IconPlus />} key={newTabKey}></Tab>
    </Tabs>
  );
};
