import { areSecondsValid, isValidTimecode } from "./validators";

export const secondsToTimecode = (seconds: number): string | null => {
  if (!areSecondsValid(seconds)) {
    return null;
  }

  const totalSeconds = Math.floor(seconds);
  const milliseconds = Math.round((seconds - totalSeconds) * 1000); // Convert fractional part to milliseconds
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  const formattedMilliseconds = `${milliseconds}`;

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export const timecodeToSeconds = (timecode: string): number | null => {
  if (!isValidTimecode(timecode)) {
    return null;
  }

  const [mainTime, milliseconds] = timecode.split(".");
  const [minutes, seconds] = mainTime.split(":").map(parseFloat);

  const totalSeconds = minutes * 60 + seconds + parseFloat(milliseconds) / 1000;

  return totalSeconds;
};
