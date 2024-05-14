import { workspaceIsPlayingAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { FC, memo, useState } from "react";
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

  const [playbackRate, setPlaybackRate] = useState(1);

  return (
    <div className="flex justify-between gap-5 mt-1">
      <div
        className={`w-full max-w-2xl rounded-xl overflow-hidden flex-grow ${styles["player-wrapper"]}`}
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
          playbackRate={playbackRate}
        />
      </div>

      <div className="w-full">
        <h6 className="font-bold">Playback rate</h6>
        <select
          className="p-2 select mt-2 w-full"
          value={playbackRate}
          onChange={(e) => setPlaybackRate(Number(e.target.value))}
        >
          <option value={0.25}>0.25</option>
          <option value={0.5}>0.5</option>
          <option value={0.75}>0.75</option>
          <option value={1}>Default speed</option>
          <option value={1.25}>1.25</option>
          <option value={1.5}>1.5</option>
          <option value={1.75}>1.75</option>
          <option value={2}>2</option>
        </select>
      </div>
    </div>
  );
});

Player.displayName = "Player";

export default Player;
