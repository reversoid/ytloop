"use client";
import { currentUserAtom } from "@/entities/user";
import { useGetCurrentUser } from "@/features/auth";
import { AuthModal } from "@/features/auth/ui/auth-modal";
import { Button } from "@nextui-org/react";
import { IconLogin2 } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { useBoolean } from "usehooks-ts";

export const AuthButton: FC = () => {
  const {
    value: isOpenAuth,
    setTrue: openAuthModal,
    setFalse: closeAuthModal,
  } = useBoolean();

  useGetCurrentUser();

  const currentUser = useAtomValue(currentUserAtom);

  if (currentUser || currentUser === undefined) {
    return null;
  }

  return (
    <>
      <Button color="primary" isIconOnly onClick={openAuthModal}>
        <IconLogin2 />
      </Button>
      <AuthModal isOpen={isOpenAuth} onClose={closeAuthModal} />
    </>
  );
};
