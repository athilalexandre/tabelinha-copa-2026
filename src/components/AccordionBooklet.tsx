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
          <span>Fan-made</span>
          <h2>Tabelinha Copa 2026</h2>
          <p>Feita para preencher aos poucos, como as tabelinhas de bolso.</p>
          <dl>
            <div>
              <dt>Grupos</dt>
              <dd>12</dd>
            </div>
            <div>
              <dt>Seleções</dt>
              <dd>48</dd>
            </div>
            <div>
              <dt>Mata-mata</dt>
              <dd>32</dd>
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
