import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { playerReadyAtom, playerSeekToFnAtom } from "@/widgets/player/model";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export const useAutoSeekStart = () => {
  const currentLoop = useAtomValue(workspaceCurrentLoopAtom);

  const seekTo = useAtomValue(playerSeekToFnAtom);
  const isPlayerReady = useAtomValue(playerReadyAtom);

  useEffect(() => {
    if (isPlayerReady && currentLoop?.from !== undefined) {
      seekTo?.(currentLoop?.from);
    }
  }, [isPlayerReady, currentLoop, seekTo]);
};
