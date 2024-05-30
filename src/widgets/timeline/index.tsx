import { FC, useMemo } from "react";
import { VideoLine } from "./ui/video-line";
import { TimelineLoop } from "./ui/timeline-loop";
import { useAtomValue } from "jotai";
import { projectLoopsAtom } from "@/entities/project/model";
import { organizeLoopsIntoGrid } from "./utils/organize-loops-into-grid";

export const Timeline: FC = () => {
  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  return (
    <div className="w-full flex flex-col gap-4 overflow-x-scroll">
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
