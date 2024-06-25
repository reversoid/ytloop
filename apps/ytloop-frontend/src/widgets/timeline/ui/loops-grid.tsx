import { useAtomValue } from "jotai";
import { FC, useMemo } from "react";
import { organizeLoopsIntoGrid } from "../utils/organize-loops-into-grid";
import { projectLoopsAtom } from "@/entities/project/model";
import { TimelineBlock } from "./timeline-block";

export const LoopsGrid: FC = () => {
  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  return (
    <div className="flex flex-col gap-4">
      {loopsGrid.map((loopsRow, index) => (
        <div className="w-full flex relative h-4" key={index}>
          {loopsRow.map((loop) => (
            <TimelineBlock loop={loop} key={loop.id} />
          ))}
        </div>
      ))}
    </div>
  );
};
