import { workspaceCurrentVideoPosition } from "@/entities/workspace/model";
import { Progress } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { FC, useContext } from "react";
import styles from "./styles.module.css";
import { PlayerContext } from "@/shared/utils/player-context";

export const VideoLine: FC = () => {
  const currentVideoPosition = useAtomValue(workspaceCurrentVideoPosition);

  const { videoLength } = useContext(PlayerContext);

  const progress = ((currentVideoPosition ?? 0) / videoLength) * 100;

  return (
    <Progress
      aria-label="Video progress"
      classNames={{ indicator: `rounded-r-none ${styles["quick-transition"]}` }}
      size="md"
      value={progress}
    />
  );
};
