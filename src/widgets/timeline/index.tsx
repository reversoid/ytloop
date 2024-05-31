import { FC } from "react";
import { LoopsGrid } from "./ui/loops-grid";
import { LoopsList } from "./ui/loops-list";
import { VideoLine } from "./ui/video-line";
import { TimelineOptions } from "./ui/timeline-options";

export const Timeline: FC = () => {
  return (
    <div className="p-2 pb-3 flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4">
        <VideoLine />
        <LoopsGrid />
      </div>

      <TimelineOptions />
      <LoopsList />
    </div>
  );
};
