import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { PlayerContext } from "@/shared/utils/player-context";
import { useAtomValue } from "jotai";
import { useContext, useEffect } from "react";

export const useAutoSeekStart = () => {
  const currentLoop = useAtomValue(workspaceCurrentLoopAtom);

  const { seekTo, isPlayerReady } = useContext(PlayerContext);

  useEffect(() => {
    if (isPlayerReady && currentLoop?.from !== undefined) {
      seekTo?.(currentLoop?.from);
    }
  }, [isPlayerReady, currentLoop, seekTo]);
};
