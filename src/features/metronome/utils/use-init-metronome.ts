import { projectOptionsAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const usePlaybackSpeed = () => {
  const projectOptions = useAtomValue(projectOptionsAtom);
  return projectOptions?.videoSpeed ?? 1;
};

export const useMetronome = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const clickCountRef = useRef<number>(0);

  const audioUrl = "/metronome-click.mp3";
  const intervalRef = useRef<number>(0); // seconds per beat

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    const audioContext = new window.AudioContext();
    audioContextRef.current = audioContext;

    const loadAudio = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
    };

    loadAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const scheduleNote = (
    clicksToPlay: number | undefined,
    resolve: () => void
  ) => {
    while (
      nextNoteTimeRef.current <
      audioContextRef.current!.currentTime + 0.1
    ) {
      if (clicksToPlay !== undefined && clickCountRef.current >= clicksToPlay) {
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
  };

  const playClick = (time: number) => {
    const source = audioContextRef.current!.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current!.destination);
    source.start(time);
  };

  const playMetronome = (bpm: number, clicksToPlay?: number): Promise<void> => {
    if (!audioBufferRef.current) {
      return Promise.reject("Audio buffer not loaded yet.");
    }
    intervalRef.current = 60 / bpm;
    nextNoteTimeRef.current = audioContextRef.current!.currentTime;
    clickCountRef.current = 0;
    setIsPlaying(true);

    return new Promise<void>((resolve) => {
      scheduleNote(clicksToPlay, resolve);
    });
  };

  const stopMetronome = () => {
    if (timerIDRef.current !== null) {
      clearTimeout(timerIDRef.current);
    }
    setIsPlaying(false);
  };

  return { isPlaying, play: playMetronome, stop: stopMetronome };
};
