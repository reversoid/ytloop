import {
  workspaceContinuePlayingAfterLoopEndsAtom,
  workspaceEnabledCountdownAtom,
} from "@/entities/workspace/model";
import { Checkbox } from "@nextui-org/react";
import { useAtom } from "jotai";

export const TimelineOptions = () => {
  const [tickBeforeStart, setTickBeforeStart] = useAtom(
    workspaceEnabledCountdownAtom
  );

  const [continuePlaying, setContinuePlaying] = useAtom(
    workspaceContinuePlayingAfterLoopEndsAtom
  );

  return (
    <>
      <Checkbox isSelected={tickBeforeStart} onValueChange={setTickBeforeStart}>
        Tick before loop starts
      </Checkbox>

      <Checkbox
        isSelected={continuePlaying}
        onValueChange={(v) => {
          setContinuePlaying(v);
        }}
      >
        Continue playing after loop ends
      </Checkbox>
    </>
  );
};
