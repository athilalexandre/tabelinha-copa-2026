"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { BestThirdPlacePage } from "@/components/BestThirdPlacePage";
import { BookletPage } from "@/components/BookletPage";
import { GroupPage } from "@/components/GroupPage";
import { KnockoutRoundPage } from "@/components/KnockoutRoundPage";
import type { PageDefinition, ScoreMap } from "@/components/BookletApp";
import { groups, knockoutRounds } from "@/data/worldCup2026";

type AccordionBookletProps = {
  pages: PageDefinition[];
  isOpen: boolean;
  focusedIndex: number;
  scores: ScoreMap;
  onFocusPage: (index: number) => void;
  onOpenBooklet: () => void;
  onUpdateScore: (matchId: string, side: "home" | "away", value: string) => void;
};

export function AccordionBooklet({
  pages,
  isOpen,
  focusedIndex,
  scores,
  onFocusPage,
  onOpenBooklet,
  onUpdateScore
}: AccordionBookletProps) {
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);

  const currentPage = pages[focusedIndex] ?? pages[0];
  const selectorItems = useMemo(() => pages.map((page) => ({ id: page.id, label: getPageSelectorLabel(page) })), [pages]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select")) {
      return;
    }

    if (!isOpen) {
      onOpenBooklet();
    }

    setDragStart(event.clientX);
    setDragDelta(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragStart === null) {
      return;
    }

    setDragDelta(event.clientX - dragStart);
  }

  function finishDrag() {
    if (dragStart === null) {
      return;
    }

    const threshold = 56;
    if (dragDelta < -threshold) {
      onFocusPage(Math.min(pages.length - 1, focusedIndex + 1));
    }

    if (dragDelta > threshold) {
      onFocusPage(Math.max(0, focusedIndex - 1));
    }

    setDragStart(null);
    setDragDelta(0);
  }

  function renderPageContent(page: PageDefinition): ReactNode {
    if (page.kind === "cover") {
      return (
        <div className="insideCover">
          <span className="badgeFanMade">Guia Não Oficial</span>
          <h2 className="insideTitle">Tabelinha Copa 2026</h2>
          <p className="insideDesc">Feita para preencher aos poucos e simular todo o chaveamento, como as tabelinhas de bolso de antigamente.</p>
          <dl className="statsGrid">
            <div className="statCard">
              <svg className="statIcon groups" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="3" rx="1"/>
                <rect width="7" height="7" x="14" y="14" rx="1"/>
                <rect width="7" height="7" x="3" y="14" rx="1"/>
              </svg>
              <div className="statInfo">
                <dt>Grupos</dt>
                <dd>12</dd>
              </div>
            </div>
            <div className="statCard">
              <svg className="statIcon teams" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" x2="4" y1="22" y2="15"/>
              </svg>
              <div className="statInfo">
                <dt>Seleções</dt>
                <dd>48</dd>
              </div>
            </div>
            <div className="statCard">
              <svg className="statIcon knockout" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/>
                <path d="M12 2a6 6 0 0 1 6 6c0 3.24-2.5 5.5-5.5 5.5h-1C8.5 13.5 6 11.24 6 8a6 6 0 0 1 6-6Z"/>
              </svg>
              <div className="statInfo">
                <dt>Mata-mata</dt>
                <dd>32</dd>
              </div>
            </div>
          </dl>
        </div>
      );
    }

    if (page.kind === "group") {
      return (
        <GroupPage
          group={groups.find((group) => group.id === page.groupId)!}
          scores={scores}
          onUpdateScore={onUpdateScore}
        />
      );
    }

    if (page.kind === "best-third") {
      return <BestThirdPlacePage groups={groups} scores={scores} />;
    }

    return (
      <KnockoutRoundPage
        round={knockoutRounds.find((round) => round.id === page.roundId)!}
        rounds={knockoutRounds}
        groups={groups}
        scores={scores}
        onUpdateScore={onUpdateScore}
      />
    );
  }

  return (
    <section className={`bookletStage ${isOpen ? "isOpen" : "isClosed"}`} aria-label="Livreto sanfonado">
      <div
        className={`bookletViewport ${dragStart !== null ? "isDragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div className="sideFold leftFold" aria-hidden="true" />
        <BookletPage key={currentPage.id} title={currentPage.title} isOpen={isOpen}>
          {renderPageContent(currentPage)}
        </BookletPage>
        <div className="sideFold rightFold" aria-hidden="true" />
      </div>
      <div className="pageTabs" aria-label="Páginas da tabelinha">
        {selectorItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === focusedIndex ? "activeTab" : ""}
            onClick={() => {
              onOpenBooklet();
              onFocusPage(index);
            }}
            aria-label={`Ir para ${pages[index]?.title}`}
            aria-current={index === focusedIndex ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function getPageSelectorLabel(page: PageDefinition) {
  if (page.kind === "cover") {
    return "Capa";
  }

  if (page.kind === "group") {
    return page.groupId;
  }

  if (page.kind === "best-third") {
    return "3ºs";
  }

  const labels: Record<string, string> = {
    "round-of-32": "R32",
    "round-of-16": "R16",
    "quarter-finals": "QF",
    "semi-finals": "SF",
    "third-place": "3º",
    final: "Final"
  };

  return labels[page.roundId] ?? page.title;
}
