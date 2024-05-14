import React, { FC, PropsWithChildren, ReactNode } from "react";

export interface TabsProps {
  tabs?: {
    selected: boolean;
    onSelected: VoidFunction;
    title: string;
    content: ReactNode;
  }[];
}

export const Tabs: FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="rounded-lg">
      <div
        role="tablist"
        className="tabs flex tabs-lifted tabs-lg overflow-auto"
      >
        {tabs?.map((t, i) => {
          return (
            <a
              key={i}
              role="tab"
              className={`w-fit text-nowrap tab ${
                t.selected ? "tab-active" : ""
              }`}
              onClick={t.onSelected}
            >
              {t.title}
            </a>
          );
        })}
      </div>

      <div className="p-4 bg-base-100 border-l border-r border-b rounded-lg rounded-tl-none  border-base-300">
        {tabs?.map((t) =>
          t.selected ? (
            <React.Fragment key={`title-${t.title}`}>
              {t.content}
            </React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};
