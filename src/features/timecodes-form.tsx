import { TimecodeInput } from "@/shared/ui/timecode-input";
import { Dispatch, FC, SetStateAction } from "react";
import { PlayButton } from "./play-button";

export interface TimecodesFormProps {
  startValue: number;
  setStartValue: Dispatch<SetStateAction<number>>;

  endValue: number | null;
  setEndValue: Dispatch<SetStateAction<number | null>>;

  getCurrentTime: () => number | undefined;

  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  seekTo: (time: number) => void;
}

export const TimecodesForm: FC<TimecodesFormProps> = ({
  getCurrentTime,
  setEndValue,
  endValue,
  setStartValue,
  startValue,
  playing,
  setPlaying,
  seekTo,
}) => {
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
        stepValue={0.001}
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
        stepValue={0.25}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime();
          if (currentTime !== undefined) {
            setEndValue(currentTime);
          }
        }}
      />

      <div className="sm:max-w-md mt-5">
        <PlayButton
          isPlaying={playing}
          onPlay={() => setPlaying(true)}
          onStop={() => {
            setPlaying(false);
            seekTo(startValue);
          }}
        />
      </div>
    </form>
  );
};
