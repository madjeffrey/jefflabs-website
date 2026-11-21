"use client";

import React, { useEffect, useState } from "react";

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
  const displayedSections = structure.filter((section) => section.display);
  const [activeId, setActiveId] = useState<string>(displayedSections[0]?.title ?? "");

  useEffect(() => {
    if (!about.tableOfContent.display) return;

    const sections = structure.filter((section) => section.display);
    if (sections.length === 0) return;

    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;

      if (nearBottom) {
        setActiveId(sections[sections.length - 1].title);
        return;
      }

      let current = sections[0].title;
      for (const section of sections) {
        const el = document.getElementById(section.title);
        if (el && el.getBoundingClientRect().top <= 160) {
          current = section.title;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [structure, about.tableOfContent.display]);

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
      className="fixed left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-6 whitespace-nowrap lg:flex"
    >
      {displayedSections.map((section, sectionIndex) => {
        const isActive = activeId === section.title;
        return (
          <div key={sectionIndex} className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setActiveId(section.title);
                scrollTo(section.title, 96);
              }}
              className={`group flex items-center gap-2.5 text-left text-[13px] font-normal transition-all duration-200 hover:translate-x-1 hover:text-fg ${
                isActive ? "text-fg" : "text-fg-muted"
              }`}
            >
              <span
                className={`h-px transition-all duration-200 group-hover:w-5 group-hover:bg-fg ${
                  isActive ? "w-5 bg-fg" : "w-3 bg-border-strong"
                }`}
              />
              <span>{section.title}</span>
            </button>
            {about.tableOfContent.subItems &&
              section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  type="button"
                  onClick={() => scrollTo(item, 96)}
                  className="group flex items-center gap-2.5 pl-6 text-left text-xs text-fg-subtle transition-all duration-200 hover:translate-x-1 hover:text-fg"
                >
                  <span className="h-px w-2 bg-border-strong transition-colors duration-200 group-hover:bg-fg" />
                  <span>{item}</span>
                </button>
              ))}
          </div>
        );
      })}
    </aside>
  );
};

export default TableOfContents;
