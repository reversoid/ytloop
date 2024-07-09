import { Project } from "@/core/models";
import { projectAtom } from "@/entities/project/model";
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
import { FC, useId } from "react";
import { useForm } from "react-hook-form";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const ProjectSettingsModal: FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const formId = useId();

  const [project, setProject] = useAtom(projectAtom);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    name: string;
    description?: string | null;
    bpm?: number | null;
  }>({
    defaultValues: {
      name: project?.name ?? "",
      bpm: project?.bpm,
      description: project?.description,
    },
  });

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
                onSubmit={handleSubmit((data) => {
                  setProject((p) => {
                    if (!p) {
                      return null;
                    }

                    return {
                      ...p,
                      name: data.name,
                      description: data.description ?? null,
                      bpm: data.bpm ?? null,
                    } satisfies Project;
                  });

                  onClose();
                })}
              >
                <Input
                  label={"Name"}
                  size="lg"
                  placeholder="Enter project name"
                  {...register("name")}
                />

                <Textarea
                  size="lg"
                  label={"Description"}
                  placeholder="Some words about this project"
                  {...register("description")}
                />

                <Input
                  inputMode="numeric"
                  label={"Default BPM"}
                  size="lg"
                  placeholder="Is used as default loop BPM"
                  {...register("bpm", { pattern: /\d*/ })}
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
                isDisabled={!isValid}
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
