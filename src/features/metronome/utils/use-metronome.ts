import { useAtomValue } from "jotai";
import { useMemo, useRef, useState } from "react";

interface UseMetronomeProps {
  bpm: number;
  onFinishedPlay?: VoidFunction;
}

export const useMetronome = ({ bpm, onFinishedPlay }: UseMetronomeProps) => {
  const audio = useMemo(() => new Audio("/metronome-click.mp3"), []);

  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const playedAmountRef = useRef<number>(0);

  const playSound = () => {
    audio.play();
    playedAmountRef.current++;
  };

  const play = (amount = Number.POSITIVE_INFINITY) => {
    if (isPlaying) {
      return;
    }
    setIsPlaying(true);

    const bps = bpm / 60;
    const interval = 1000 / bps;

    playSound();

    timerRef.current = setInterval(() => {
      if (playedAmountRef.current >= amount) {
        onFinishedPlay?.();
        stop();
        return;
      }

      playSound();
    }, interval);
  };

  const stop = () => {
    playedAmountRef.current = 0;
    setIsPlaying(false);
    clearInterval(timerRef.current);
  };

  return { play, stop, isPlaying };
};
