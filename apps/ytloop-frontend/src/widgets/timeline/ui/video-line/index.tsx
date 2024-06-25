import {
  playerCurrentVideoPositionAtom,
  playerVideoLengthAtom,
} from "@/widgets/player/model";
import { Progress } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { FC } from "react";
import styles from "./styles.module.css";

export const VideoLine: FC = () => {
  const currentVideoPosition = useAtomValue(playerCurrentVideoPositionAtom);

  const videoLength = useAtomValue(playerVideoLengthAtom);

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
