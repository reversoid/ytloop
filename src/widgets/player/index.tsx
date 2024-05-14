import { workspaceIsPlayingAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { FC, memo, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import styles from "./styles.module.css";
import { Select, SelectItem } from "@nextui-org/react";

export interface PlayerProps {
  onProgress: (props: OnProgressProps) => void;
  url: string;
  refCallback?: (player: ReactPlayer | null) => void;
}

const Player: FC<PlayerProps> = memo(({ onProgress, url, refCallback }) => {
  const [playing, setPlaying] = useAtom(workspaceIsPlayingAtom);

  const [playbackRate, setPlaybackRate] = useState(new Set([1]));

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-5 mt-1">
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
          playbackRate={Array.from(playbackRate)[0]}
        />
      </div>

      <div className="w-full">
        <h6 className="font-bold">Playback rate</h6>
        <Select
          label="Playback rate"
          className="mt-2"
          selectedKeys={playbackRate}
          onChange={(e) =>
            setPlaybackRate((prev) => {
              prev.clear();
              prev.add(Number(e.target.value));
              return new Set(prev);
            })
          }
        >
          <SelectItem key={0.25} value={0.25}>
            0.25
          </SelectItem>
          <SelectItem key={0.5} value={0.5}>
            0.5
          </SelectItem>
          <SelectItem key={0.75} value={0.75}>
            0.75
          </SelectItem>
          <SelectItem key={1} value={1}>
            Default speed
          </SelectItem>
          <SelectItem key={1.25} value={1.25}>
            1.25
          </SelectItem>
          <SelectItem key={1.5} value={1.5}>
            1.5
          </SelectItem>
          <SelectItem key={1.75} value={1.75}>
            1.75
          </SelectItem>
          <SelectItem key={2} value={2}>
            2
          </SelectItem>
        </Select>
      </div>
    </div>
  );
});

Player.displayName = "Player";

export default Player;
