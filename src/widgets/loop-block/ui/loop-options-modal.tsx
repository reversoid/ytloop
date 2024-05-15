import { projectLoopsAtom } from "@/entities/project/model";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
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

export interface OptionsModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const OptionsModal: FC<OptionsModalProps> = ({ isOpen, onClose }) => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);

  const [name, setName] = useState(currentLoop?.name ?? "");
  const [description, setDescription] = useState(
    currentLoop?.description ?? ""
  );
  const [bpm, setBpm] = useState(
    currentLoop?.bpm ? String(currentLoop?.bpm) : ""
  );

  const canDelete = projectLoops?.length && projectLoops.length > 1;
  const removeLoop = () => {
    if (!canDelete || !currentLoop) {
      return;
    }

    const currentLoopPosition = projectLoops.findIndex(
      (l) => l.id === currentLoop.id
    );

    setProjectLoops(
      (loops) => loops?.filter((l) => l.id !== currentLoop?.id) ?? null
    );

    setCurrentLoop(
      projectLoops[(currentLoopPosition + 1) % projectLoops.length]
    );
  };

  const editLoop = () => {
    setCurrentLoop((l) => {
      if (!l) {
        return null;
      }

      const numbericBpm = Number(bpm);
      return {
        ...l,
        name,
        description,
        bpm: numbericBpm > 0 ? numbericBpm : currentLoop?.bpm,
      };
    });
  };

  const formId = useId();

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editLoop();
                  onClose();
                }}
                id={formId}
                className="flex flex-col gap-4"
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  label="Name"
                  placeholder="Enter loop name"
                />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  label="Description"
                  placeholder="Enter some description"
                />

                <Input
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                  size="lg"
                  label="BPM"
                  placeholder="Current loop bpm"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col gap-3 w-full">
                <Button
                  onPress={() => {
                    removeLoop();
                    onClose();
                  }}
                  fullWidth
                  size="lg"
                  color="danger"
                  variant="bordered"
                  isDisabled={!canDelete}
                >
                  Remove loop
                </Button>
                <Button
                  type="submit"
                  form={formId}
                  fullWidth
                  size="lg"
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
