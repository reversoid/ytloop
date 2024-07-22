import { useEffect } from "react";
import { SyncHook } from "./types";

export const useSyncWithRemote: SyncHook = ({ project, loops, enabled }) => {
  useEffect(() => {
    if (!enabled || !project) {
      return;
    }

    console.log(project);
  }, [project]);

  useEffect(() => {
    if (!enabled || !loops) {
      return;
    }

    console.log(loops);
  }, [loops]);
};
