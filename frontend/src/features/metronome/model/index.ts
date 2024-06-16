import { atom } from "jotai";

export const metronomeIsPlayingAtom = atom(false);

export const metronomePlayAtom = atom<
  ((bpm: number, amount: number) => Promise<void>) | null
>(null);

export const metronomeStopAtom = atom<VoidFunction | null>(null);

export const metronomeAtom = atom((get) => ({
  isPlaying: get(metronomeIsPlayingAtom),
  play: get(metronomePlayAtom),
  stop: get(metronomeStopAtom),
}));
