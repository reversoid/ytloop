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

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const ProjectSettingsModal: FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const formId = useId();
  const maskRef = useInputMask({
    mask: "(99)|(999)",
    options: { placeholder: "", jitMasking: true, showMaskOnHover: false },
  });

  const [projectName, setProjectName] = useAtom(projectNameAtom);
  const [projectDescription, setProjectDescription] = useAtom(
    projectDescriptionAtom
  );

  const [projectOptions, setProjectOptions] = useAtom(projectOptionsAtom);

  const [name, setName] = useState(projectName ?? "");
  const [description, setDescription] = useState(projectDescription ?? "");
  const [bpm, setBpm] = useState(
    projectOptions?.bpm ? String(projectOptions.bpm) : ""
  );

  const saveProjectSettings = () => {
    if (name) {
      setProjectName(name);
    }

    setProjectDescription(description);

    const numbericBpm = Number(bpm);
    if (numbericBpm > 1) {
      setProjectOptions((o) => ({ ...o, bpm: numbericBpm }));
    }
  };

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Project settings
            </ModalHeader>
            <ModalBody>
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveProjectSettings();
                  onClose();
                }}
              >
                <Input
                  label={"Name"}
                  size="lg"
                  placeholder="Enter project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Textarea
                  size="lg"
                  label={"Description"}
                  placeholder="Some words about this project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                  ref={maskRef}
                  inputMode="numeric"
                  label={"Default BPM"}
                  size="lg"
                  placeholder="Is used as default loop BPM"
                  value={bpm}
                  onChange={(e) => setBpm(e.target.value)}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                size="lg"
                type="submit"
                form={formId}
                fullWidth
                color="primary"
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
