"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { FC, PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider>
      <NextUIProvider>
        <NextThemesProvider defaultTheme="light" attribute="class">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
};
