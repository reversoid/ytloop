import { FC, PropsWithChildren } from "react";

export const Collapse: FC<
  PropsWithChildren<{ label: string; defaultOpen?: boolean }>
> = ({ children, label, defaultOpen }) => {
  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" defaultChecked={defaultOpen} />
      <div className="collapse-title text-xl font-medium">{label}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
