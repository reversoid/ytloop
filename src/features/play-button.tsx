import { FC } from "react";

export interface PlayButtonProps {
  isPlaying: boolean;
  onStop: () => void;
  onPlay: () => void;
}

export const PlayButton: FC<PlayButtonProps> = ({
  isPlaying,
  onPlay,
  onStop,
}) => {
  if (isPlaying) {
    return (
      <button onClick={onStop} className="btn btn-primary btn-outline w-full">
        Stop
      </button>
    );
  }

  return (
    <button onClick={onPlay} className="btn btn-primary w-full">
      Play
    </button>
  );
};
