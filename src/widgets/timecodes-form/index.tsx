import { TimecodeInput } from "@/shared/ui/timecode-input";
import { Dispatch, FC, SetStateAction } from "react";
import { PlayButton } from "../../features/play-button";
import { useAtom } from "jotai";
import {
  workspaceDelta,
  workspaceEndTime,
  workspaceIsPlaying,
  workspaceStartTime,
} from "@/entities/workspace/model";

export interface TimecodesFormProps {
  getCurrentTime: () => number | undefined;
  seekTo: (time: number) => void;
}

export const TimecodesForm: FC<TimecodesFormProps> = ({
  getCurrentTime,
  seekTo,
}) => {
  const [startValue, setStartValue] = useAtom(workspaceStartTime);
  const [endValue, setEndValue] = useAtom(workspaceEndTime);
  const [stepValue, setStepValue] = useAtom(workspaceDelta);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlaying);

  return (
    <form
      className="flex flex-col gap-2 sm:max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TimecodeInput
        label="Start"
        value={startValue}
        onChange={setStartValue}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime();
          if (currentTime !== undefined) {
            setStartValue(currentTime);
          }
        }}
      />

      <TimecodeInput
        label="End"
        value={endValue}
        onChange={setEndValue}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime();
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
            seekTo(startValue);
          }}
        />
      </div>
    </form>
  );
};
