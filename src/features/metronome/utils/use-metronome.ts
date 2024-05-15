import { useMemo, useRef, useState } from "react";

interface UseMetronomeProps {
  bpm: number;
}

export const useMetronome = ({ bpm }: UseMetronomeProps) => {
  const audio = useMemo(() => {
    if (typeof window === undefined) {
      return;
    }
    if (window.Audio) {
      return new window.Audio("/metronome-click.mp3");
    }
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const playedAmountRef = useRef<number>(0);

  const playSound = () => {
    if (audio) {
      audio.play();
      playedAmountRef.current++;
    }
  };

  const play = (amount = Number.POSITIVE_INFINITY) => {
    if (isPlaying) {
      return new Promise((_, reject) => reject("ALREADY_PLAYING"));
    }

    return new Promise<void>((resolve) => {
      setIsPlaying(true);

      const bps = bpm / 60;
      const interval = 1000 / bps;

      playSound();

      timerRef.current = setInterval(() => {
        if (playedAmountRef.current >= amount) {
          resolve();
          stop();
          return;
        }

        playSound();
      }, interval);
    });
  };

  const stop = () => {
    playedAmountRef.current = 0;
    setIsPlaying(false);
    clearInterval(timerRef.current);
  };

  return { play, stop, isPlaying };
};
