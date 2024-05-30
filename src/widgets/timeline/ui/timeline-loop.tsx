import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { Code } from "@nextui-org/react";
import { FC } from "react";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineLoop: FC<TimelineLoopProps> = ({ loop }) => {
  return <Code className="border-2">{loop.name}</Code>;
};
