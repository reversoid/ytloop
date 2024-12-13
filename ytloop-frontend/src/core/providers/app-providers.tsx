"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { FC, PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider>
      <NextUIProvider>
        <NextThemesProvider defaultTheme="dark" attribute="class">
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </Provider>
  );
};
