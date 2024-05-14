import { FC } from "react";

export interface PlayButtonProps {
  isPlaying: boolean;
  onStop: () => void;
  onPlay: () => void;
  disabled: boolean;
}

export const PlayButton: FC<PlayButtonProps> = ({
  isPlaying,
  onPlay,
  onStop,
  disabled,
}) => {
  if (isPlaying) {
    return (
      <button
        onClick={onStop}
        className={`btn btn-primary btn-outline w-full ${
          disabled && "btn-disabled no-animation"
        }`}
      >
        Stop
      </button>
    );
  }

  return (
    <button
      onClick={onPlay}
      className={`btn btn-primary w-full ${
        disabled && "btn-disabled no-animation"
      }`}
    >
      Play
    </button>
  );
};
