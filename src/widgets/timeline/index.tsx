import { FC, useEffect, useMemo, useRef, useState } from "react";
import { VideoLine } from "./ui/video-line";
import { TimelineLoop } from "./ui/timeline-loop";
import { useAtomValue } from "jotai";
import { Loop, projectLoopsAtom } from "@/entities/project/model";
import { organizeLoopsIntoGrid } from "./utils/organize-loops-into-grid";
import { UiLoopsAtom } from "./utils/ui-loops-atom";
import { ValidLoop } from "@/entities/project/utils/is-loop-valid";

export const Timeline: FC = () => {
  const videoLength = 226;

  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  const uiLoopsData = useAtomValue(UiLoopsAtom);

  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loops?.length !== uiLoopsData.length || !rowRef.current) {
      return;
    }

    const loopDataWithMaxTextLength = uiLoopsData.reduce(
      (prev, value) => (value.textWidth > prev.textWidth ? value : prev),
      uiLoopsData[0]
    );

    const paddingX = 16;
    const blockWidth = loopDataWithMaxTextLength.textWidth + paddingX;

    const loop = loops.find(
      (l) => l.id === loopDataWithMaxTextLength.loopId
    ) as ValidLoop;

    const percentsOfVideo = ((loop.to - loop.from) / videoLength) * 100;

    const widthOfOnePercent = blockWidth / percentsOfVideo;

    const timelineWidth = widthOfOnePercent * 100;

    rowRef.current!.style.width = `${timelineWidth}px`;
  }, [loops, uiLoopsData]);

  return (
    <div ref={rowRef} className="w-full flex flex-col gap-4 overflow-x-scroll">
      <VideoLine />

      <div className="flex flex-col gap-2 h-80">
        {loopsGrid.map((loopsRow, index) => (
          <div className="flex relative h-8" key={index}>
            {loopsRow.map((loop) => (
              <TimelineLoop loop={loop} key={loop.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
