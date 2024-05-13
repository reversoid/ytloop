import { Tab, Tabs } from "@/shared/ui/tabs";
import { TimecodesForm } from "../timecodes-form";
import { useLoops } from "./utils/use-loops";
import { useSyncLoops } from "./utils/use-sync-loops";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { useEffect } from "react";

const useSetInitialLoop = () => {
  const { projectLoops, setCurrentLoop } = useLoops();

  useEffect(() => {
    if (projectLoops) {
      setCurrentLoop(projectLoops[0] || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const LoopTabs = () => {
  const { projectLoops, currentLoop, setCurrentLoop } = useLoops();

  useSyncLoops();

  useSetInitialLoop();

  return (
    <Tabs>
      {projectLoops?.map((loop) => {
        return (
          <Tab
            title={loop.name}
            selected={currentLoop?.id === loop.id}
            key={loop.id}
          >
            <TimecodesForm />
          </Tab>
        );
      })}

      <Tab
        title="New"
        onSelected={() => {
          // setCurrentLoop(
          //   createNewLoop({ postfixNumber: (projectLoops?.length ?? 0) + 1 })
          // );
        }}
      ></Tab>
    </Tabs>
  );
};
