import { atom, useAtom } from "jotai";

type SeekToFn = (to: number) => void;
type GetCurrentTimeFn = () => number;

export const playerReadyAtom = atom(false);

export const playerIsPlayingAtom = atom(false);

export const playerVideoLengthAtom = atom(0);

export const playerSeekToFnAtom = atom<SeekToFn | null>(null);

export const playerGetCurrentTimeFnAtom = atom<GetCurrentTimeFn | null>(null);

export const playerCurrentVideoPositionAtom = atom(0);
