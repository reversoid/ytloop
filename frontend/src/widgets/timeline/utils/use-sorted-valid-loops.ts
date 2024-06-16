import { projectLoopsAtom } from "@/entities/project/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import { useAtomValue } from "jotai";

export const useSortedValidLoops = () => {
  const loops = useAtomValue(projectLoopsAtom);
  return loops?.filter(isLoopValid).sort((a, b) => a.from - b.from);
};
