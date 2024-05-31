import { ValidLoop } from "@/entities/project/utils/is-loop-valid";
import { Code } from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import { FC, useEffect, useRef } from "react";
import { UiLoopsAtom } from "../utils/ui-loops-atom";

export interface TimelineLoopProps {
  loop: ValidLoop;
}

export const TimelineLoop: FC<TimelineLoopProps> = ({ loop }) => {
  const videoLength = 226;

  const widthPercentage = ((loop.to - loop.from) / videoLength) * 100;
  const leftPercentage = (loop.from / videoLength) * 100;

  const blockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const setUiLoopsData = useSetAtom(UiLoopsAtom);

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    setUiLoopsData((prev) => [
      ...prev.filter((l) => l.loopId !== loop.id),
      { loopId: loop.id, textWidth: textRef.current!.offsetWidth },
    ]);
  }, [loop.id, setUiLoopsData, textRef.current?.offsetWidth]);

  return (
    <div
      style={{ minWidth: `${widthPercentage}%`, left: `${leftPercentage}%` }}
      className="absolute border-2 overflow-hidden px-2 py-1"
      ref={blockRef}
    >
      <span ref={textRef}>{loop.name}</span>
    </div>
  );
};
