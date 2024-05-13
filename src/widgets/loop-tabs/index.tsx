import { Tab, Tabs } from "@/shared/ui/tabs";
import { TimecodesForm } from "../timecodes-form";
import { useSyncLoops } from "./utils/use-sync-loops";
import { createNewLoop } from "@/entities/project/utils/create-new-loop";
import { useEffect, useLayoutEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { projectLoopsAtom } from "@/entities/project/model";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { useHydrateAtoms } from "jotai/utils";

const useSetInitialLoop = () => {
  const projectLoops = useAtomValue(projectLoopsAtom);
  const setCurrentLoop = useSetAtom(workspaceCurrentLoopAtom);
};

export const LoopTabs = () => {
  const projectLoops = useAtomValue(projectLoopsAtom);
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

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
            onSelected={() => {
              setCurrentLoop(loop);
            }}
          >
            <TimecodesForm />
          </Tab>
        );
      })}

      <Tab
        title="New"
        onSelected={() => {
          setCurrentLoop(
            createNewLoop({ postfixNumber: (projectLoops?.length ?? 0) + 1 })
          );
        }}
      ></Tab>
    </Tabs>
  );
};
