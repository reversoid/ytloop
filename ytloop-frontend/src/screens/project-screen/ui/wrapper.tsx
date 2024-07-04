import { FC, PropsWithChildren } from "react";

export const ProjectScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};
