import React, {
  Dispatch,
  FC,
  ForwardedRef,
  LegacyRef,
  MutableRefObject,
  RefObject,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

const usePlayerRef = (inRef: ForwardedRef<ReactPlayer>) => {
  const ref = useRef<ReactPlayer>(null);
  useImperativeHandle(inRef, () => ref.current!, [ref]);

  return ref;
};

export interface PlayerProps {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  onProgress: (props: OnProgressProps) => void;
  url: string;
}

const Player = forwardRef<ReactPlayer, PlayerProps>(
  ({ playing, setPlaying, onProgress, url }, inRef) => {
    const ref = usePlayerRef(inRef);

    return (
      <div className="rounded-md overflow-hidden">
        <ReactPlayer
          style={{ borderRadius: "1rem !important" }}
          playing={playing}
          onPlay={() => setPlaying(true)}
          ref={ref}
          onProgress={onProgress}
          controls={true}
          progressInterval={10}
          url={url}
        />
      </div>
    );
  }
);

Player.displayName = "Player";

export default Player;
