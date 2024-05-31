import {
  Loop,
  projectLoopsAtom,
  projectOptionsAtom,
} from "@/entities/project/model";
import { ValidLoop, isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceEnabledCountdown,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { PlayerContext } from "@/shared/utils/player-context";
import { Button } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext } from "react";
import { useSortedValidLoops } from "../utils/use-sorted-valid-loops";
import { MetronomeContext } from "@/features/metronome";

export const LoopsList = () => {
  const loops = useSortedValidLoops();

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlayingAtom);

  const isCountdownEnabled = useAtomValue(workspaceEnabledCountdown);

  const metronome = useContext(MetronomeContext);

  const projectOptions = useAtomValue(projectOptionsAtom);

  const { seekTo } = useContext(PlayerContext);

  const isSelectedLoop = (loopId: Loop["id"]) => loopId === currentLoop?.id;

  const handleLoopClick = (loop: ValidLoop) => {
    seekTo?.(loop.from);
    setCurrentLoop(loop);

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (isCountdownEnabled && projectOptions?.bpm) {
        metronome.play(projectOptions.bpm, 4).then(() => setIsPlaying(true));
      } else {
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {loops?.map((loop) => (
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
