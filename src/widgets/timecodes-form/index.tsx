import {
  workspaceCurrentLoopAtom,
  workspaceDeltaAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { TimecodeInput } from "@/shared/ui/timecode-input";
import { useAtom } from "jotai";
import { useCallback, useContext } from "react";
import { PlayButton } from "../../features/play-button";
import { PlayerContext } from "@/shared/utils/player-context";

export const TimecodesForm = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [stepValue, setStepValue] = useAtom(workspaceDeltaAtom);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlayingAtom);

  const { getCurrentTime, seekTo } = useContext(PlayerContext);

  const setStartValue = useCallback(
    (v: number) => {
      setCurrentLoop((loop) => loop && { ...loop, from: v });
    },
    [setCurrentLoop]
  );

  const setEndValue = useCallback(
    (v: number) => {
      setCurrentLoop((loop) => loop && { ...loop, to: v });
    },
    [setCurrentLoop]
  );

  return (
    <form
      className="flex flex-col gap-2 sm:max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TimecodeInput
        label="Start"
        value={currentLoop?.from || null}
        onChange={useCallback((v) => setStartValue(v), [setStartValue])}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime?.();
          if (currentTime !== undefined) {
            setStartValue(currentTime);
          }
        }}
      />

      <TimecodeInput
        label="End"
        value={currentLoop?.to || null}
        onChange={setEndValue}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime?.();

          if (currentTime !== undefined) {
            setEndValue(currentTime);
          }
        }}
      />

      <div className="sm:max-w-md mt-5">
        <PlayButton
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onStop={() => {
            setIsPlaying(false);
            if (currentLoop?.from !== undefined) {
              seekTo?.(currentLoop?.from);
            }
          }}
        />
      </div>
    </form>
  );
};
