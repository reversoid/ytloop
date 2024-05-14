import { useEffect, useState } from "react";
import { secondsToTimecode } from "./transform";

export const useTimecodeValue = (seconds: number | null) => {
  const [value, setValue] = useState<string>(
    seconds === null ? "" : secondsToTimecode(seconds) ?? ""
  );

  useEffect(() => {
    setValue(
      (prevValue) =>
        prevValue || (seconds === null ? "" : secondsToTimecode(seconds) ?? "")
    );
  }, [seconds]);

  return [value, setValue] as const;
};
