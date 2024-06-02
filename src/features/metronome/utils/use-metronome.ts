import { projectOptionsAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

const usePlaybackSpeed = () => {
  const projectOptions = useAtomValue(projectOptionsAtom);
  return projectOptions?.videoSpeed ?? 1;
};

/** Implements all ticking logic about metronome  */
export const useMetronome = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const clickCountRef = useRef<number>(0);
  const playbackSpeed = usePlaybackSpeed();

  const audioUrl = "/metronome-click.mp3";
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    const audioContext = new window.AudioContext();
    audioContextRef.current = audioContext;

    let loadAttempts = 0;
    const loadAudio = async () => {
      loadAttempts++;
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
      } catch (error) {
        if (loadAttempts > 3) {
          console.error("Error loading audio file:", error);
        } else {
          loadAudio();
        }
      }
    };

    loadAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const stopMetronome = useCallback(() => {
    if (timerIDRef.current !== null) {
      clearTimeout(timerIDRef.current);
    }
    setIsPlaying(false);
  }, []);

  const scheduleNote = useCallback(
    (clicksToPlay: number | undefined, resolve: () => void) => {
      while (
        nextNoteTimeRef.current <
        audioContextRef.current!.currentTime + 0.1
      ) {
        if (
          clicksToPlay !== undefined &&
          clickCountRef.current >= clicksToPlay
        ) {
          stopMetronome();
          resolve();
          return;
        }

        playClick(nextNoteTimeRef.current);
        nextNoteTimeRef.current += intervalRef.current;
        clickCountRef.current += 1;
      }
      timerIDRef.current = window.setTimeout(
        () => scheduleNote(clicksToPlay, resolve),
        25
      );
    },
    [stopMetronome]
  );

  const playClick = (time: number) => {
    const source = audioContextRef.current!.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current!.destination);
    source.start(time);
  };

  const playMetronome = useCallback(
    (bpm: number, clicksToPlay?: number): Promise<void> => {
      if (!audioBufferRef.current) {
        return Promise.reject("Audio buffer not loaded yet.");
      }
      intervalRef.current = 60 / bpm / playbackSpeed;
      nextNoteTimeRef.current = audioContextRef.current!.currentTime;
      clickCountRef.current = 0;
      setIsPlaying(true);

      return new Promise<void>((resolve) => {
        scheduleNote(clicksToPlay, resolve);
      });
    },
    [playbackSpeed, scheduleNote]
  );

  return { isPlaying, play: playMetronome, stop: stopMetronome };
};
