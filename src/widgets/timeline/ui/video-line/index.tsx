import {
  workspaceCurrentVideoPosition,
  workspaceVideoLength,
} from "@/entities/workspace/model";
import { Progress } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { FC } from "react";
import styles from "./styles.module.css";

export const VideoLine: FC = () => {
  const currentVideoPosition = useAtomValue(workspaceCurrentVideoPosition);

  const videoLength = useAtomValue(workspaceVideoLength);

  const progress = ((currentVideoPosition ?? 0) / videoLength) * 100;

  return (
    <Progress
      classNames={{ indicator: `rounded-r-none ${styles["quick-transition"]}` }}
      size="md"
      value={progress}
    />
  );
};
