import {
  workspaceCurrentVideoPosition,
  workspaceVideoLength,
} from "@/entities/workspace/model";
import { useAtomValue } from "jotai";
import { FC } from "react";

export const VideoLine: FC = () => {
  const currentVideoPosition = useAtomValue(workspaceCurrentVideoPosition);

  const videoLength = useAtomValue(workspaceVideoLength);

  return (
    <div className="relative w-full h-2 flex overflow-hidden rounded-lg">
      <div className="w-full h-2 bg-primary rounded-md">
        <div
          style={{
            top: "0",
            transform: `translateX(${
              ((currentVideoPosition ?? 0) / videoLength) * 100
            }%)`,
            transition: "transform 0.1s linear",
          }}
          className="top-0 left-0 absolute w-full h-2 bg-content2"
        ></div>
      </div>
    </div>
  );
};
