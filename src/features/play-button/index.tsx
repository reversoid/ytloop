import { Button } from "@nextui-org/react";
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
      <Button
        fullWidth
        color="primary"
        variant="bordered"
        onClick={onStop}
        isDisabled={disabled}
        size="lg"
      >
        Stop
      </Button>
    );
  }

  return (
    <Button
      fullWidth
      color="primary"
      onClick={onPlay}
      isDisabled={disabled}
      size="lg"
    >
      Play
    </Button>
  );
};
