export const isValidTimecode = (timecode: string): boolean => {
  // This regex matches two or more digits for minutes, two digits for seconds, and one or more digits for milliseconds
  const timecodeRegex = /^(\d{2,}):([0-5][0-9])\.([0-9]{2})$/;
  if (!timecodeRegex.test(timecode)) {
    return false;
  }

  const [minutesSeconds, milliseconds] = timecode.split(".");
  const [minutes, seconds] = minutesSeconds.split(":").map(Number);

  if (minutes < 0 || seconds < 0 || seconds > 59 || Number(milliseconds) < 0) {
    return false;
  }

  return true;
};

export const areSecondsValid = (seconds: number) => {
  return seconds > 0;
};
