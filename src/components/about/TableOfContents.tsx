"use client";

import React from "react";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <aside
      aria-label="About section navigation"
      className="fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-6 whitespace-nowrap xl:flex"
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => scrollTo(section.title, 90)}
              className="group flex items-center gap-3 text-left text-xs font-semibold tracking-wide text-fg-muted transition-all duration-200 hover:translate-x-1 hover:text-brand"
            >
              <span className="h-0.5 w-4 bg-border-strong transition-all duration-200 group-hover:w-6 group-hover:bg-brand" />
              <span>{section.title}</span>
            </button>
            {about.tableOfContent.subItems &&
              section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  type="button"
                  onClick={() => scrollTo(item, 90)}
                  className="group flex items-center gap-2.5 pl-6 text-left text-xs text-fg-subtle transition-all duration-200 hover:translate-x-1 hover:text-fg"
                >
                  <span className="h-px w-2 bg-border-strong group-hover:bg-brand" />
                  <span>{item}</span>
                </button>
              ))}
          </div>
        ))}
    </aside>
  );
};

export default TableOfContents;
