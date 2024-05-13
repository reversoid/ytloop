import { createContext } from "react";

export const PlayerContext = createContext<{
  getCurrentTime?: () => number;
  seekTo?: (seconds: number) => void;
}>({});
