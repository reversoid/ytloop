import { Loop, projectLoopsAtom } from "@/entities/project/model";
import { ValidLoop, isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { PlayerContext } from "@/shared/utils/player-context";
import { Button } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext } from "react";

export const LoopsList = () => {
  const loops = useAtomValue(projectLoopsAtom);

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlayingAtom);

  const { seekTo } = useContext(PlayerContext);

  const handleLoopClick = (loop: ValidLoop) => {
    seekTo?.(loop.from);
    setCurrentLoop(loop);

    if (loop.id !== currentLoop?.id) {
      setIsPlaying(true);
    } else {
      setIsPlaying((v) => !v);
    }
  };

  const isSelectedLoop = (loopId: Loop["id"]) => loopId === currentLoop?.id;

  return (
    <div className="flex flex-col gap-2">
      {loops
        ?.filter(isLoopValid)
        .sort((a, b) => a.from - b.from)
        .map((loop) => (
          <Button
            disableRipple
            className="flex justify-start"
            size="lg"
            key={loop.id}
            onClick={() => handleLoopClick(loop)}
            color={isSelectedLoop(loop.id) ? "primary" : "default"}
            variant={
              isPlaying && isSelectedLoop(loop.id)
                ? "bordered"
                : isSelectedLoop(loop.id)
                ? "solid"
                : "bordered"
            }
          >
            <div className="flex gap-2 items-center">
              <div
                style={{ background: loopColorHash.hex(loop.id) }}
                className="w-2 h-2 rounded-lg"
              ></div>

              <p>{loop.name}</p>
            </div>
          </Button>
        ))}
    </div>
  );
};
