import { IconArrowBadgeDown, IconMinus, IconPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { secondsToTimecode, timecodeToSeconds } from "./utils/transform";
import { useTimecodeValue } from "./utils/use-timecode-value";
import { isValidTimecode } from "./utils/validators";

export interface TimecodeInputProps {
  value: number | null;
  onChange: (value: number) => void;
  onTakeFromVideo: VoidFunction;
  label: string;
  stepValue: number;
}

export const TimecodeInput: FC<TimecodeInputProps> = ({
  label,
  onChange,
  value,
  stepValue,
  onTakeFromVideo,
}) => {
  const [timecodeValue, setTimecodeValue] = useTimecodeValue(value);

  useEffect(() => {
    if (isValidTimecode(timecodeValue)) {
      onChange(timecodeToSeconds(timecodeValue)!);
    }
  }, [timecodeValue, onChange]);

  return (
    <>
      <label className="form-control w-full sm:max-w-md">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <div className="gap-2 flex flex-col sm:flex-row">
          <input
            value={timecodeValue}
            onChange={(event) => setTimecodeValue(event.target.value)}
            type="text"
            placeholder="mm:ss.mss"
            className="input input-bordered w-full sm:max-w-sm"
          />
          <div className="flex gap-1">
            <div className="tooltip" data-tip={`Subtract ${stepValue}s`}>
              <button
                onClick={() => value && onChange(value - stepValue)}
                className="btn btn-square"
              >
                <IconMinus />
              </button>
            </div>

            <div className="tooltip" data-tip={`Add ${stepValue}s`}>
              <button
                onClick={() => value && onChange(value + stepValue)}
                className="btn btn-square"
              >
                <IconPlus />
              </button>
            </div>

            <div
              className="tooltip"
              data-tip="Take from current video position"
            >
              <button onClick={onTakeFromVideo} className="btn btn-square">
                <IconArrowBadgeDown />
              </button>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};
