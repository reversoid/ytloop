"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "jotai";
import { FC, PropsWithChildren } from "react";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider>
      <NextUIProvider>{children}</NextUIProvider>{" "}
    </Provider>
  );
};
