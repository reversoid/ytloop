import { workspaceIsPlayingAtom } from "@/entities/workspace/model";
import { useAtom } from "jotai";
import { FC, memo } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export interface PlayerProps {
  onProgress: (props: OnProgressProps) => void;
  url: string;
  refCallback?: (player: ReactPlayer | null) => void;
}

const Player: FC<PlayerProps> = memo(({ onProgress, url, refCallback }) => {
  const [playing, setPlaying] = useAtom(workspaceIsPlayingAtom);

  return (
    <div className="rounded-md overflow-hidden">
      <ReactPlayer
        style={{ borderRadius: "1rem !important" }}
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
