import { projectOptionsAtom } from "@/entities/project/model";
import { Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, memo, useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  playerCurrentVideoPositionAtom,
  playerGetCurrentTimeFnAtom,
  playerIsPlayingAtom,
  playerReadyAtom,
  playerSeekToFnAtom,
  playerVideoLengthAtom,
} from "../model";
import styles from "./styles.module.css";
import { OnProgressProps } from "react-player/base";
import {
  workspaceContinuePlayingAfterLoopEndsAtom,
  workspaceCurrentLoopAtom,
  workspaceEnabledCountdownAtom,
} from "@/entities/workspace/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import { metronomePlayAtom } from "@/features/metronome/model";

export interface PlayerProps {
  url: string;
}

const Player: FC<PlayerProps> = memo(({ url }) => {
  const [playing, setPlaying] = useAtom(playerIsPlayingAtom);

  const setReadyPlayer = useSetAtom(playerReadyAtom);
  const setVideoLength = useSetAtom(playerVideoLengthAtom);

  const [seekTo, setSeekTo] = useAtom(playerSeekToFnAtom);

  const setCurrentTimeGetter = useSetAtom(playerGetCurrentTimeFnAtom);

  const [projectOptions, setProjectOptions] = useAtom(projectOptionsAtom);

  const [playbackRate, setPlaybackRate] = useState(
    new Set([projectOptions?.videoSpeed ?? 1])
  );

  const setCurrentVideoPosition = useSetAtom(playerCurrentVideoPositionAtom);

  const currentLoop = useAtomValue(workspaceCurrentLoopAtom);

  const enabledCountdown = useAtomValue(workspaceEnabledCountdownAtom);

  const continuePlayingAfterLoopEnds = useAtomValue(
    workspaceContinuePlayingAfterLoopEndsAtom
  );

  const playMetronome = useAtomValue(metronomePlayAtom);

  const handleProgress = ({ playedSeconds }: OnProgressProps) => {
    setCurrentVideoPosition(playedSeconds);

    if (!currentLoop || !isLoopValid(currentLoop)) {
      return;
    }

    if (!playing) {
      return;
    }

    if (playedSeconds >= currentLoop.from && playedSeconds < currentLoop.to) {
      return;
    }

    if (continuePlayingAfterLoopEnds) {
      return;
    }

    if (currentLoop.bpm && enabledCountdown) {
      setPlaying(false);
      seekTo!(currentLoop.from);
      playMetronome!(currentLoop.bpm, 4).then(() => {
        setPlaying(true);
      });
    } else {
      seekTo!(currentLoop.from);
      setPlaying(true);
    }
  };

  return (
    <div className="pb-3 px-0.5 flex flex-col sm:flex-row justify-between gap-5">
      <div
        className={`w-full max-w-2xl rounded-xl overflow-hidden flex-grow ${styles["player-wrapper"]}`}
      >
        <ReactPlayer
          playing={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          ref={useCallback(
            (player: ReactPlayer) => {
              if (!player) {
                return;
              }

              setSeekTo(() => (to: number) => player.seekTo(to));
              setCurrentTimeGetter(() => () => player.getCurrentTime());
            },
            [setCurrentTimeGetter, setSeekTo]
          )}
          onReady={() => setReadyPlayer(true)}
          onDuration={setVideoLength}
          onProgress={handleProgress}
          controls={true}
          progressInterval={25}
          url={url}
          playbackRate={Array.from(playbackRate)[0]}
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
});

Player.displayName = "Player";

export default Player;
