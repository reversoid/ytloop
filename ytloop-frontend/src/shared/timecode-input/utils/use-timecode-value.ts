import { useEffect, useState } from "react";
import { secondsToTimecode } from "./transform";

export const useTimecodeDisplayValue = (seconds: number | null) => {
  const [displayValue, setDisplayValue] = useState<string>(
    seconds === null ? "" : secondsToTimecode(seconds) ?? ""
  );

  useEffect(() => {
    setDisplayValue(seconds === null ? "" : secondsToTimecode(seconds) ?? "");
  }, [seconds]);

  return [displayValue, setDisplayValue] as const;
};
