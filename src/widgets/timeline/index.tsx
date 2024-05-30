import { FC } from "react";
import { VideoLine } from "./ui/video-line";
import { TimelineLoop } from "./ui/timeline-loop";

export const Timeline: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <VideoLine />

      <div className="flex">
        <TimelineLoop />
        <TimelineLoop />
        <TimelineLoop />
        <TimelineLoop />
      </div>
    </div>
  );
};
