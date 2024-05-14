import { IconArrowBadgeDown, IconMinus, IconPlus } from "@tabler/icons-react";
import { FC, useEffect } from "react";
import { timecodeToSeconds } from "./utils/transform";
import { useTimecodeDisplayValue } from "./utils/use-timecode-value";
import ReactInputMask from "react-input-mask";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { useInputMask, withMask } from "use-mask-input";

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

  const maskRef = useInputMask({
    mask: "99:99.999",
    options: { placeholder: "", jitMasking: true, showMaskOnHover: false },
  });

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="gap-3 flex flex-col sm:flex-row">
        <Input
          ref={maskRef}
          value={displayValue}
          onChange={(event) => setDisplayValue(event.target.value)}
          inputMode="numeric"
          type="text"
          size="lg"
          placeholder="mm:ss.SSS"
        />

        <div className="flex gap-1">
          <Tooltip content={`Subtract ${stepValue}s`}>
            <Button
              onClick={() => value && onChange(value - stepValue)}
              isIconOnly
              size="lg"
            >
              <IconMinus />
            </Button>
          </Tooltip>

          <Tooltip content={`Add ${stepValue}s`}>
            <Button
              onClick={() => value && onChange(value + stepValue)}
              isIconOnly
              size="lg"
            >
              <IconPlus />
            </Button>
          </Tooltip>

          <Tooltip content="Take from current video position">
            <Button onClick={onTakeFromVideo} isIconOnly size="lg">
              <IconArrowBadgeDown />
            </Button>
          </Tooltip>
        </div>
      </div>
    </label>
  );
};
