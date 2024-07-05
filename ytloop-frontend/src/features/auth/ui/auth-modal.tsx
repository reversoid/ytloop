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
import { FC, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useBoolean, useToggle } from "usehooks-ts";

interface AuthModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { value: isVisible, toggle: toggleVisibility } = useBoolean();
  const [isSignUp, toggleSignUp] = useToggle(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isSignUp ? "Sign Up" : "Sign In"}
            </ModalHeader>

            <ModalBody>
              <Input label="Email" placeholder="Enter your email" size="lg" />
              <Input
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
                    <Link onClick={toggleSignUp} as="button">
                      Sign In
                    </Link>
                  </p>
                ) : (
                  <p>
                    Do not have an account yet?{" "}
                    <Link onClick={toggleSignUp} as="button">
                      Sign Up
                    </Link>
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                size="lg"
                color="primary"
                onPress={onClose}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
