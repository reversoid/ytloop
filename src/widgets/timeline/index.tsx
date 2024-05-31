import { FC } from "react";
import { LoopsGrid } from "./ui/loops-grid";
import { LoopsList } from "./ui/loops-list";
import { VideoLine } from "./ui/video-line";

export const Timeline: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4">
        <VideoLine />
        <LoopsGrid />
      </div>

      <LoopsList />
    </div>
  );
};
