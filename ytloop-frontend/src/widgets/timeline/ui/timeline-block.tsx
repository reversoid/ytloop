import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { playerVideoLengthAtom } from "@/widgets/player/model";
import { Tooltip } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { FC } from "react";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineBlock: FC<TimelineLoopProps> = ({ loop }) => {
  const videoLength = useAtomValue(playerVideoLengthAtom);

  const widthPercentage =
    ((loop.toTimeMs - loop.fromTimeMs) / videoLength) * 100;
  const leftPercentage = (loop.fromTimeMs / videoLength) * 100;

  const setCurrentLoop = useSetAtom(workspaceCurrentLoopAtom);

  return (
    <Tooltip content={loop.name} showArrow>
      <button
        style={{
          background: loopColorHash.hex(String(loop.id)),
          width: `${widthPercentage}%`,
          left: `${leftPercentage}%`,
        }}
        className="h-4 absolute overflow-hidden text-nowrap px-2 py-1"
        onClick={() => setCurrentLoop(loop)}
      ></button>
    </Tooltip>
  );
};
