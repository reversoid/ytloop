import { TIMECODE_PATTERN } from "./timecode-pattern";

export const secondsToTimecode = (seconds: number): string | null => {
  const milliseconds = Number(Number(seconds.toFixed(3)) * 1000);

  const mm = Math.floor(milliseconds / 60000);
  const ss = Math.floor((milliseconds % 60000) / 1000);
  const SSS = milliseconds % 1000;

  const formattedMinutes = String(mm).padStart(2, "0");
  const formattedSeconds = String(ss).padStart(2, "0");
  const formattedMilliseconds = String(SSS).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export const timecodeToSeconds = (timecode: string): number | null => {
  const match = timecode.match(TIMECODE_PATTERN);

  if (!match) {
    return null;
  }

  const [_, mm, ss, SSS] = match;

  const totalMilliseconds =
    Number(mm) * 60000 + Number(ss) * 1000 + Number(SSS);

  return Number((totalMilliseconds / 1000).toFixed(3));
};
