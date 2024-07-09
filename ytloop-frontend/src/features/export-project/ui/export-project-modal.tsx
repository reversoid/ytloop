import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IconCheck } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useCopy } from "../utils/use-copy";
import { ShareTabs } from "./export-tabs";

export interface ExportProjectModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const ExportProjectModal: FC<ExportProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [link, setLink] = useState<string | null>(null);
  const { copy, isCopied } = useCopy();

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Export project
          </ModalHeader>
          <ModalBody>
            <ShareTabs onSetLink={setLink} />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => link && copy(link)}
              size="lg"
              type="submit"
              fullWidth
              color="primary"
            >
              {isCopied ? <IconCheck /> : "Copy link"}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
