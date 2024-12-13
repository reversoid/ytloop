import { projectAtom } from "@/entities/project/model";
import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceEnabledCountdownAtom,
} from "@/entities/workspace/model";
import { metronomeAtom } from "@/features/metronome";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import {
  playerIsPlayingAtom,
  playerSeekToFnAtom,
} from "@/widgets/player/model";
import { Button } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useSortedValidLoops } from "../utils/use-sorted-valid-loops";
import { Loop } from "@/core/models";

export const LoopsList = () => {
  const loops = useSortedValidLoops();

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [isPlaying, setIsPlaying] = useAtom(playerIsPlayingAtom);

  const isCountdownEnabled = useAtomValue(workspaceEnabledCountdownAtom);

  const metronome = useAtomValue(metronomeAtom);

  const project = useAtomValue(projectAtom);

  const seekTo = useAtomValue(playerSeekToFnAtom);

  const isSelectedLoop = (loopId: Loop["id"]) => loopId === currentLoop?.id;

  const handleLoopClick = (loop: ValidLoop) => {
    seekTo?.(loop.fromTimeMs);
    setCurrentLoop(loop);

    if ((isPlaying || metronome.isPlaying) && loop.id === currentLoop?.id) {
      metronome.stop!();
      setIsPlaying(false);
      return;
    }

    if (isCountdownEnabled && project?.bpm) {
      setIsPlaying(false);
      metronome.play!(project.bpm, 4).then(() => setIsPlaying(true));
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <b>Play loops</b>
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
              (isPlaying || metronome.isPlaying) && isSelectedLoop(loop.id)
                ? "bordered"
                : isSelectedLoop(loop.id)
                ? "solid"
                : "bordered"
            }
          >
            <div className="flex gap-2 items-center">
              <div
                style={{ background: loopColorHash.hex(String(loop.id)) }}
                className="w-2 h-2 rounded-lg"
              ></div>

              <p>{loop.name}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
