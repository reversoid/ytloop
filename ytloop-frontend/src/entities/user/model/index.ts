import { User } from "@/core/models";
import { atom } from "jotai";

export const currentUserAtom = atom<User | null | undefined>(undefined);
