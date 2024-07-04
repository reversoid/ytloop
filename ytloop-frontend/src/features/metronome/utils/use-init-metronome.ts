import { useEffect } from "react";
import { useMetronome } from "./use-metronome";
import { useSetAtom } from "jotai";
import {
  metronomeIsPlayingAtom,
  metronomePlayAtom,
  metronomeStopAtom,
} from "../model";

/** Initializes metronome */
export const useInitMetronome = () => {
  const { isPlaying, play, stop } = useMetronome();

  const setPlay = useSetAtom(metronomePlayAtom);
  const setStop = useSetAtom(metronomeStopAtom);
  const setIsPlaying = useSetAtom(metronomeIsPlayingAtom);

  useEffect(() => {
    setIsPlaying(() => isPlaying);
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    setPlay(() => play);
    setStop(() => stop);
  }, [play, setPlay, setStop, stop]);
};
