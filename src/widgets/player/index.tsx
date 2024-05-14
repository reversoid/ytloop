import { workspaceIsPlayingAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { FC, memo } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import styles from "./styles.module.css";

export interface PlayerProps {
  onProgress: (props: OnProgressProps) => void;
  url: string;
  refCallback?: (player: ReactPlayer | null) => void;
}

const Player: FC<PlayerProps> = memo(({ onProgress, url, refCallback }) => {
  const [playing, setPlaying] = useAtom(workspaceIsPlayingAtom);

  return (
    <div
      className={`max-w-2xl rounded-xl overflow-hidden ${styles["player-wrapper"]}`}
    >
      <ReactPlayer
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        ref={refCallback}
        onProgress={onProgress}
        controls={true}
        progressInterval={1}
        url={url}
      />
    </div>
  );
});

Player.displayName = "Player";

export default Player;
