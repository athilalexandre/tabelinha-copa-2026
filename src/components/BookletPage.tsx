import type { ReactNode } from "react";

type BookletPageProps = {
  title: string;
  isOpen: boolean;
  children: ReactNode;
};

export function BookletPage({ title, isOpen, children }: BookletPageProps) {
  return (
    <article className={`bookletPage ${isOpen ? "openPage" : "closedPage"}`} aria-label={title}>
      <div className="pageRibbon" aria-hidden="true">
        {title}
      </div>
      <div className="pageInner">{children}</div>
    </article>
  );
}
