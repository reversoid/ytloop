import { projectLoops } from "@/entities/project/model";
import { workspaceCurrentLoop } from "@/entities/workspace/model";
import { Tab, Tabs } from "@/shared/ui/tabs";
import { useAtom, useAtomValue } from "jotai";
import { TimecodesForm } from "../timecodes-form";

export interface LoopTabsProps {}

export const LoopTabs = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoop);
  const loops = useAtomValue(projectLoops);

  return (
    <Tabs>
      {loops?.map((loop) => {
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
          // Create new loop
        }}
      ></Tab>
    </Tabs>
  );
};
