import { Button } from "@nextui-org/react";
import { IconFileExport } from "@tabler/icons-react";
import { useState } from "react";
import { ExportProjectModal } from "./ui/export-project-modal";

export const ExportProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} isIconOnly>
        <IconFileExport />
      </Button>

      <ExportProjectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
