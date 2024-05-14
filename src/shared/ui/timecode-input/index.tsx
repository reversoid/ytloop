import { IconArrowBadgeDown, IconMinus, IconPlus } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { timecodeToSeconds } from "./utils/transform";
import { useTimecodeDisplayValue } from "./utils/use-timecode-value";
import ReactInputMask from "react-input-mask";

export interface TimecodeInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
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
  const [displayValue, setDisplayValue] = useTimecodeDisplayValue(value);

  useEffect(() => {
    const seconds = timecodeToSeconds(displayValue);

    if (!displayValue) {
      return onChange(null);
    }

    onChange(seconds ?? -1);
  }, [displayValue, onChange]);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="gap-2 flex flex-col sm:flex-row">
        <ReactInputMask
          mask={"99:99.999"}
          maskChar={""}
          inputMode="numeric"
          placeholder="mm:ss:SSS"
          value={displayValue}
          onChange={(event) => setDisplayValue(event.target.value)}
          type="text"
          className="input input-bordered w-full"
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

          <div className="tooltip" data-tip="Take from current video position">
            <button onClick={onTakeFromVideo} className="btn btn-square">
              <IconArrowBadgeDown />
            </button>
          </div>
        </div>
      </div>
    </label>
  );
};
