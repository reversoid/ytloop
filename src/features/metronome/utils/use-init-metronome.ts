import { projectOptionsAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { useMemo, useRef, useState } from "react";

const usePlaybackSpeed = () => {
  const projectOptions = useAtomValue(projectOptionsAtom);
  return projectOptions?.videoSpeed ?? 1;
};

export const useInitMetronome = () => {
  const audio = useMemo(() => {
    if (typeof window === undefined) {
      return;
    }
    if (window.Audio) {
      return new window.Audio("/metronome-click.mp3");
    }
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const playbackSpeed = usePlaybackSpeed();

  const intervalRef = useRef<NodeJS.Timeout>();
  const lastTimerRef = useRef<NodeJS.Timeout>();
  const playedAmountRef = useRef<number>(0);

  const playSound = () => {
    if (audio) {
      audio.play();
      playedAmountRef.current++;
    }
  };

  const play = (
    bpm: number,
    amount = Number.POSITIVE_INFINITY
  ): Promise<void> => {
    if (isPlaying) {
      return new Promise<void>((_, reject) => reject("ALREADY_PLAYING"));
    }

    return new Promise<void>((resolve) => {
      setIsPlaying(true);

      const bps = bpm / 60;
      const interval = 1000 / bps;

      playSound();

      intervalRef.current = setInterval(() => {
        if (playedAmountRef.current >= amount - 1) {
          playSound();

          const VIDEO_START_DELAY = 70;

          lastTimerRef.current = setTimeout(() => {
            resolve();
            stop();
          }, interval / playbackSpeed - VIDEO_START_DELAY);
          return;
        }

        playSound();
      }, interval / playbackSpeed);
    });
  };

  const stop = () => {
    playedAmountRef.current = 0;
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    clearTimeout(lastTimerRef.current);
  };

  return { play, stop, isPlaying };
};
