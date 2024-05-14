import { FC, PropsWithChildren } from "react";

export const ProjectWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};
