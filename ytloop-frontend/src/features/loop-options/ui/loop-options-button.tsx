import { Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { OptionsModal } from "./loop-options-modal";

export const LoopOptionsButton = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Button onClick={openModal} fullWidth size="lg">
        Settings
      </Button>

      <OptionsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
