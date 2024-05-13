import { Dispatch, FC, MutableRefObject, SetStateAction } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export interface PlayerProps {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  onProgress: (props: OnProgressProps) => void;
  url: string;
  refCallback?: (player: ReactPlayer | null) => void;
}

export const Player: FC<PlayerProps> = ({
  playing,
  setPlaying,
  onProgress,
  url,
  refCallback,
}) => {
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
};
