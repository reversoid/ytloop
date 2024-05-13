import {
  workspaceCurrentLoop,
  workspaceDelta,
  workspaceIsPlaying,
} from "@/entities/workspace/model";
import { TimecodeInput } from "@/shared/ui/timecode-input";
import { useAtom } from "jotai";
import { useContext } from "react";
import { PlayButton } from "../../features/play-button";
import { PlayerContext } from "@/shared/utils/player-context";

export const TimecodesForm = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoop);
  const [stepValue, setStepValue] = useAtom(workspaceDelta);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlaying);

  const { getCurrentTime, seekTo } = useContext(PlayerContext);

  const setStartValue = (v: number) => {
    setCurrentLoop((loop) => loop && { ...loop, from: v });
  };

  const setEndValue = (v: number) => {
    setCurrentLoop((loop) => loop && { ...loop, to: v });
  };

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
        onChange={(v) => setStartValue(v)}
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
