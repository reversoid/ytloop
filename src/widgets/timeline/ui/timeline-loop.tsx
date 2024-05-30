import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { Code } from "@nextui-org/react";
import { FC } from "react";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineLoop: FC<TimelineLoopProps> = ({ loop }) => {
  const videoLength = 226;

  const widthPercentage = ((loop.to - loop.from) / videoLength) * 100;
  const leftPercentage = (loop.from / videoLength) * 100;

  return (
    <Code
      style={{ minWidth: `${widthPercentage}%`, left: `${leftPercentage}%` }}
      className="absolute border-2 overflow-hidden"
    >
      {loop.name}
    </Code>
  );
};
