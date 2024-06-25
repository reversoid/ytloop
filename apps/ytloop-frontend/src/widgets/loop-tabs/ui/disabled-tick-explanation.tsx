import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IconInfoCircle } from "@tabler/icons-react";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";

export const DisabledTickExplanation: FC = () => {
  const {
    value: explanationOpen,
    setTrue: openExplanation,
    setFalse: closeExplanation,
  } = useBoolean();

  return (
    <>
      <Button onClick={openExplanation} isIconOnly size="sm">
        <IconInfoCircle />
      </Button>

      <Modal size="xs" isOpen={explanationOpen} onClose={closeExplanation}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Why tick is disabled?
              </ModalHeader>
              <ModalBody>
                <p>This is because BPM is not set in current loop.</p>
                <p>
                  For convinience, you can set up default BPM in project
                  settings, so this BPM will be applied to each new created
                  loop. And you always can edit loop BPM event project one is
                  set.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button size="lg" fullWidth color="primary" onPress={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
