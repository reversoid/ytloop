import { workspaceIsPlayingAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { FC, memo, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import styles from "./styles.module.css";
import { Select, SelectItem } from "@nextui-org/react";
import { projectOptionsAtom } from "@/entities/project/model";

export interface PlayerProps {
  onProgress: (props: OnProgressProps) => void;
  onReady: VoidFunction;
  url: string;
  refCallback?: (player: ReactPlayer | null) => void;
}

const Player: FC<PlayerProps> = memo(
  ({ onProgress, url, refCallback, onReady }) => {
    const [playing, setPlaying] = useAtom(workspaceIsPlayingAtom);
    const [projectOptions, setProjectOptions] = useAtom(projectOptionsAtom);

    const [playbackRate, setPlaybackRate] = useState(
      new Set([projectOptions?.videoSpeed ?? 1])
    );

    return (
      <div className="pb-3 px-0.5 flex flex-col sm:flex-row justify-between gap-5">
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
            progressInterval={25}
            url={url}
            playbackRate={Array.from(playbackRate)[0]}
            onReady={onReady}
          />
        </div>

        <div className="w-full">
          <Select
            label="Playback rate"
            selectedKeys={playbackRate}
            onChange={(e) =>
              setPlaybackRate((prev) => {
                prev.clear();
                const newSpeed = Number(e.target.value);
                prev.add(newSpeed);
                setProjectOptions((o) => ({ ...o, videoSpeed: newSpeed }));
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
  }
);

Player.displayName = "Player";

export default Player;
