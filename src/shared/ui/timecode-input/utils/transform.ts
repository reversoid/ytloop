import dayjs from "dayjs";
import { TIMECODE_FORMAT, TIMECODE_PATTERN } from "./timecode-pattern";

export const secondsToTimecode = (seconds: number): string | null => {
  const time = dayjs.duration({ seconds });

  return time.format(TIMECODE_FORMAT);
};

export const timecodeToSeconds = (timecode: string): number | null => {
  const match = timecode.match(TIMECODE_PATTERN);

  if (!match) {
    return null;
  }

  const [_, mm, ss, SSS] = match;

  const time = dayjs.duration({
    minutes: Number(mm),
    seconds: Number(ss),
    milliseconds: Number(SSS),
  });

  return time.seconds();
};
