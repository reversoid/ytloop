import { Button } from "@nextui-org/react";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { ProjectSettingsModal } from "./ui/project-settings-modal";

export const ProjectSettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} isIconOnly>
        <IconSettings />
      </Button>

      <ProjectSettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
