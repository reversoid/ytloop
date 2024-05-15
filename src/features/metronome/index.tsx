import { Button } from "@nextui-org/react";

export const Metronome = () => {
  return (
    <Button
      onPress={() => {
        var audio = new Audio("/metronome-click.mp3");
        audio.play();
      }}
    >
      Play
    </Button>
  );
};
