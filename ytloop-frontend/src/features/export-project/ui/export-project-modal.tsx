import {
  projectAtom,
  projectDescriptionAtom,
  projectNameAtom,
  projectOptionsAtom,
} from "@/entities/project/model";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useAtom } from "jotai";
import { FC, useId, useState } from "react";
import { useInputMask } from "use-mask-input";
import { ShareTabs } from "./export-tabs";
import { useCopy } from "../utils/use-copy";
import { IconCheck } from "@tabler/icons-react";

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
        {(onClose) => (
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
        )}
      </ModalContent>
    </Modal>
  );
};
