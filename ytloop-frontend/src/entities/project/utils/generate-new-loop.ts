import { Loop } from "@/core/models";

/** Generates loop for local use */
export const generateNewLoop = ({
  id,
  bpm,
}: {
  id: number;
  bpm?: number | null;
}): Loop => {
  return {
    id,
    name: `New Loop ${id}`,
    bpm: bpm ?? null,
    description: null,
    fromTimeMs: null,
    toTimeMs: null,
  };
};
