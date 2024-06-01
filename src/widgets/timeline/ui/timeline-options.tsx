import { projectLoopsAtom } from "@/entities/project/model";
import { ValidLoop, isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceCurrentVideoPosition,
  workspaceEnabledCountdown,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { PlayButton } from "@/features/play-button";
import { Checkbox } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export const TimelineOptions = () => {
  const [tickBeforeStart, setTickBeforeStart] = useAtom(
    workspaceEnabledCountdown
  );

  const loops = useAtomValue(projectLoopsAtom);

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  const setIsPlaying = useSetAtom(workspaceIsPlayingAtom);

  const currentVideoPosition = useAtomValue(workspaceCurrentVideoPosition);

  const nearestLoop = loops
    ?.filter(isLoopValid)
    ?.reduce(
      (prevLoop, currentLoop) =>
        Math.abs(prevLoop.from - currentVideoPosition) >
        Math.abs(currentLoop.from - currentVideoPosition)
          ? currentLoop
          : prevLoop,
      loops.find(isLoopValid) as ValidLoop
    );

  return (
    <>
      <Checkbox isSelected={tickBeforeStart} onValueChange={setTickBeforeStart}>
        Tick before loop starts
      </Checkbox>

      <Checkbox
        isSelected={!currentLoop}
        onValueChange={(continuePlay) => {
          setCurrentLoop(continuePlay ? null : nearestLoop ?? null);
          if (!continuePlay) {
            setIsPlaying(false);
          }
        }}
      >
        Continue playing after loop ends
      </Checkbox>
    </>
  );
};
