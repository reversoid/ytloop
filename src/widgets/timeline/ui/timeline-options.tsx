import { workspaceEnabledCountdown } from "@/entities/workspace/model";
import { Checkbox } from "@nextui-org/react";
import { useAtom } from "jotai";

export const TimelineOptions = () => {
  const [tickBeforeStart, setTickBeforeStart] = useAtom(
    workspaceEnabledCountdown
  );

  return (
    <>
      <Checkbox isSelected={tickBeforeStart} onValueChange={setTickBeforeStart}>
        Tick before loop starts
      </Checkbox>
    </>
  );
};
