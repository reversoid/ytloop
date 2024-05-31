import { FC, useEffect, useMemo, useRef, useState } from "react";
import { VideoLine } from "./ui/video-line";
import { TimelineLoop } from "./ui/timeline-loop";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Loop, projectLoopsAtom } from "@/entities/project/model";
import { organizeLoopsIntoGrid } from "./utils/organize-loops-into-grid";
import { UiLoopsAtom } from "./utils/ui-loops-atom";
import { ValidLoop, isLoopValid } from "@/entities/project/utils/is-loop-valid";
import { Card, CardBody } from "@nextui-org/react";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";

export const Timeline: FC = () => {
  const videoLength = 226;

  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  // const uiLoopsData = useAtomValue(UiLoopsAtom);

  // // const rowRef = useRef<HTMLDivElement>(null);

  // // useEffect(() => {
  // //   if (loops?.length !== uiLoopsData.length || !rowRef.current) {
  // //     return;
  // //   }

  // //   const loopDataWithMaxTextLength = uiLoopsData.reduce((prev, value) => {
  // //     const prevPercents = (prev.loop.to - prev.loop.from) / videoLength;

  // //     const currentPercents = (value.loop.to - value.loop.from) / videoLength;

  // //     const prevValue = prev.textWidth / prevPercents;

  // //     const currentValue = value.textWidth / currentPercents;

  // //     return currentValue > prevValue ? value : prev;
  // //   }, uiLoopsData[0]);

  // //   const paddingX = 16;
  // //   const blockWidth = Math.min(
  // //     loopDataWithMaxTextLength.textWidth + paddingX,
  // //     200
  // //   );

  // //   const loop = loopDataWithMaxTextLength.loop;

  // //   const percentsOfVideo = ((loop.to - loop.from) / videoLength) * 100;

  // //   const widthOfOnePercent = blockWidth / percentsOfVideo;

  // //   const timelineWidth = widthOfOnePercent * 100;

  // //   rowRef.current!.style.width = `${timelineWidth}px`;
  // // }, [loops, uiLoopsData]);

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

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
            <Card
              className={`bg-zinc-800 hover:bg-zinc-700 ${
                currentLoop?.id === loop.id ? "bg-primary hover:bg-primary" : ""
              }`}
              key={loop.id}
            >
              <CardBody as={"button"} onClick={() => setCurrentLoop(loop)}>
                <div key={loop.id} className="flex gap-2 items-center">
                  <div
                    style={{ background: loopColorHash.hex(loop.id) }}
                    className="w-2 h-2 rounded-lg"
                  ></div>

                  <p>{loop.name}</p>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
};
