import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Link,
} from "@nextui-org/react";
import { FC, useId } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useBoolean, useToggle } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  login as loginFn,
  register as registerFn,
} from "@/core/api/methods/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

type AuthForm = {
  email: string;
  password: string;
};

const REGEX_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { value: isVisible, toggle: toggleVisibility } = useBoolean();
  const [isSignUp, toggleSignUp] = useToggle(true);
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthForm>();

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess() {
      onClose();
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess() {
      onClose();
    },
  });

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isSignUp ? "Sign Up" : "Sign In"}
            </ModalHeader>

            <ModalBody>
              <form
                id={formId}
                className="flex flex-1 flex-col gap-3"
                onSubmit={handleSubmit((form) => {
                  if (isSignUp) {
                    registerMutation.mutate({
                      username: form.email.split("@")[0],
                      email: form.email,
                      password: form.password,
                    });
                  } else {
                    loginMutation.mutate({
                      email: form.email,
                      password: form.password,
                    });
                  }
                })}
              >
                <Input
                  {...register("email", {
                    required: true,
                    pattern: REGEX_PATTERN,
                  })}
                  label="Email"
                  placeholder="Enter your email"
                  size="lg"
                />

                <Input
                  {...register("password", { required: true, min: 8 })}
                  label="Password"
                  placeholder="Enter your password"
                  size="lg"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IconEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <div className="flex py-2 px-1 justify-between">
                  {isSignUp ? (
                    <p>
                      Already have an account?{" "}
                      <Link type="button" onClick={toggleSignUp} as="button">
                        Sign In
                      </Link>
                    </p>
                  ) : (
                    <p>
                      Do not have an account yet?{" "}
                      <Link type="button" onClick={toggleSignUp} as="button">
                        Sign Up
                      </Link>
                    </p>
                  )}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                form={formId}
                className="w-full"
                size="lg"
                color="primary"
                isDisabled={!isValid}
                isLoading={isLoading}
              >
                {isLoading ? null : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
