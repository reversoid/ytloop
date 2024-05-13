import React, { FC, PropsWithChildren } from "react";

export const Tab: FC<
  PropsWithChildren<{
    title: string;
    selected?: boolean;
    onSelected?: VoidFunction;
  }>
> = ({ children, title, selected, onSelected }) => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs"
        role="tab"
        className="tab"
        aria-label={title}
        checked={selected}
        onChange={(e) => {
          const selected = e.target.checked;
          if (selected) {
            onSelected?.();
          }
        }}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        {children}
      </div>
    </>
  );
};

export const Tabs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div role="tablist" className="tabs tabs-lifted tabs-lg">
      {children}
    </div>
  );
};
