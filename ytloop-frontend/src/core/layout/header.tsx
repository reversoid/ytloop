import Logo from "@/assets/logo";
import { FC } from "react";

import { ThemeSwitcher } from "./theme-switcher";

import NextLink from "next/link";

import { AuthButton } from "./auth-button";

export const Header: FC = () => {
  return (
    <header className="h-16 border-b-1 border-foreground-200 shrink-0 flex justify-center">
      <div className="px-2 h-16 grow flex justify-between items-center max-w-screen-xl">
        <div className="">
          <NextLink className="w-fit" href={"/"}>
            <Logo />
          </NextLink>
        </div>
        <div className="flex gap-2">
          {<AuthButton />}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
