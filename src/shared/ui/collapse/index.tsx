import { FC, PropsWithChildren } from "react";

export interface CollapseProps {
  label: string;
  defaultOpen?: boolean;
  size?: "xl";
}

export const Collapse: FC<PropsWithChildren<CollapseProps>> = ({
  children,
  label,
  defaultOpen,
  size,
}) => {
  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" defaultChecked={defaultOpen} />
      <div
        className={`collapse-title font-medium ${
          size === "xl" ? "text-xl" : ""
        }`}
      >
        {label}
      </div>
      <div className="collapse-content overflow-hidden">{children}</div>
    </div>
  );
};
