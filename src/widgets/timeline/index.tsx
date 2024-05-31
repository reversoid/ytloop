import { projectLoopsAtom } from "@/entities/project/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { FC, useContext, useMemo } from "react";
import { TimelineLoop } from "./ui/timeline-loop";
import { VideoLine } from "./ui/video-line";
import { organizeLoopsIntoGrid } from "./utils/organize-loops-into-grid";
import { PlayerContext } from "@/shared/utils/player-context";

export const Timeline: FC = () => {
  const videoLength = 226;

  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlayingAtom);

  const { seekTo } = useContext(PlayerContext);

  return (
    <div>
      <div className="w-full flex flex-col gap-4 overflow-x-scroll">
        <VideoLine />

        <div className="flex flex-col gap-4">
          {loopsGrid.map((loopsRow, index) => (
            <div className="w-full flex relative h-4" key={index}>
              {loopsRow.map((loop) => (
                <TimelineLoop loop={loop} key={loop.id} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {loops
          ?.filter(isLoopValid)
          .sort((a, b) => a.from - b.from)
          .map((loop) => (
            <Button
              disableRipple
              className="flex justify-start"
              size="lg"
              key={loop.id}
              onClick={() => {
                seekTo?.(loop.from);
                setCurrentLoop(loop);

                if (loop.id !== currentLoop?.id) {
                  setIsPlaying(true);
                } else {
                  setIsPlaying((v) => !v);
                }
              }}
              color={currentLoop?.id === loop.id ? "primary" : "default"}
              variant={
                isPlaying && currentLoop?.id === loop.id
                  ? "bordered"
                  : currentLoop?.id === loop.id
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
    </div>
  );
};
