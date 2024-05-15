import { createContext } from "react";

export const MetronomeContext = createContext<{
  play: (bpm: number, amount: number) => Promise<void>;
  stop: VoidFunction;
  isPlaying: boolean;
}>({
  isPlaying: false,
  play(bpm, amount) {
    return Promise.resolve();
  },
  stop: () => {},
});
