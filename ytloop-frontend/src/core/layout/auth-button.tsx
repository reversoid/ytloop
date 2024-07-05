"use client";
import { AuthModal } from "@/features/auth/ui/auth-modal";
import { Button } from "@nextui-org/react";
import { IconLogin2 } from "@tabler/icons-react";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";

export const AuthButton: FC = () => {
  const {
    value: isOpenAuth,
    setTrue: openAuthModal,
    setFalse: closeAuthModal,
  } = useBoolean();

  return (
    <>
      <Button color="primary" isIconOnly onClick={openAuthModal}>
        <IconLogin2 />
      </Button>
      <AuthModal isOpen={isOpenAuth} onClose={closeAuthModal} />
    </>
  );
};
