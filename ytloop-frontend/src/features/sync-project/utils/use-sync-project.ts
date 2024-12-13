import { projectAtom, projectLoopsAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { useSyncWithQuery } from "./use-sync-with-query";
import { useSyncWithRemote } from "./use-sync-with-remote";

/** Syncs project with source */
export const useSyncProject = (options: {
  strategy: "remote" | "local" | false;
}) => {
  const project = useAtomValue(projectAtom);
  const loops = useAtomValue(projectLoopsAtom);

  useSyncWithQuery({ project, loops, enabled: options.strategy === "local" });
  useSyncWithRemote({ project, loops, enabled: options.strategy === "remote" });
};
