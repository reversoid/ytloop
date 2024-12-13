import { YT_VIDEO_PATTERN } from "./video-id-pattern";

export const extractVideoIdFromUrl = (str: string) => {
  const match = YT_VIDEO_PATTERN.exec(str);

  return match ? match[1] : null;
};
