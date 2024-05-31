import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { Code, Tooltip } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { FC, useEffect, useRef } from "react";
import { UiLoopsAtom } from "../utils/ui-loops-atom";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineLoop: FC<TimelineLoopProps> = ({ loop }) => {
  const videoLength = 226;

  const widthPercentage = ((loop.to - loop.from) / videoLength) * 100;
  const leftPercentage = (loop.from / videoLength) * 100;

  const setCurrentLoop = useSetAtom(workspaceCurrentLoopAtom);

  return (
    <Tooltip content={loop.name} showArrow>
      <button
        style={{
          background: loopColorHash.hex(loop.id),
          width: `${widthPercentage}%`,
          left: `${leftPercentage}%`,
        }}
        className="h-4 absolute overflow-hidden text-nowrap px-2 py-1"
        onClick={() => setCurrentLoop(loop)}
      ></button>
    </Tooltip>
  );
};
