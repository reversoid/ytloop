"use client";

import { Provider } from "jotai";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
