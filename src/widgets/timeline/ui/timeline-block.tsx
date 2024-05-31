import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceVideoLength,
} from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { Tooltip } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { FC } from "react";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineBlock: FC<TimelineLoopProps> = ({ loop }) => {
  const videoLength = useAtomValue(workspaceVideoLength);

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
