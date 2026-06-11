"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AccordionBooklet } from "@/components/AccordionBooklet";
import { BookletCover } from "@/components/BookletCover";
import { NavigationControls } from "@/components/NavigationControls";
import {
  dataVerificationNote,
  groups,
  knockoutRounds,
  tournamentFormat
} from "@/data/worldCup2026";

export type PageDefinition =
  | { id: string; title: string; kind: "cover" }
  | { id: string; title: string; kind: "group"; groupId: string }
  | { id: string; title: string; kind: "best-third" }
  | { id: string; title: string; kind: "knockout"; roundId: string };

const storageKeys = {
  open: "tabelinha:open",
  focusedPage: "tabelinha:focusedPage",
  scores: "tabelinha:scores"
};

export type ScoreMap = Record<string, { home: string; away: string }>;

export function BookletApp() {
  const pages = useMemo<PageDefinition[]>(
    () => [
      { id: "cover", title: "Capa", kind: "cover" },
      ...groups.map((group) => ({
        id: `group-${group.id}`,
        title: group.name,
        kind: "group" as const,
        groupId: group.id
      })),
      { id: "best-third", title: "Melhores 3º", kind: "best-third" },
      ...knockoutRounds.map((round) => ({
        id: round.id,
        title: round.name,
        kind: "knockout" as const,
        roundId: round.id
      }))
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [scores, setScores] = useState<ScoreMap>({});

  useEffect(() => {
    const storedOpen = window.localStorage.getItem(storageKeys.open);
    const storedPage = window.localStorage.getItem(storageKeys.focusedPage);
    const storedScores = window.localStorage.getItem(storageKeys.scores);

    if (storedOpen) {
      setIsOpen(storedOpen === "true");
    }

    if (storedPage) {
      const parsedPage = Number.parseInt(storedPage, 10);
      if (!Number.isNaN(parsedPage)) {
        setFocusedIndex(Math.min(Math.max(parsedPage, 0), pages.length - 1));
      }
    }

    if (storedScores) {
      try {
        setScores(JSON.parse(storedScores) as ScoreMap);
      } catch {
        setScores({});
      }
    }
  }, [pages.length]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.open, String(isOpen));
  }, [isOpen]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.focusedPage, String(focusedIndex));
  }, [focusedIndex]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.scores, JSON.stringify(scores));
  }, [scores]);

  const focusPrevious = useCallback(() => {
    setFocusedIndex((current) => Math.max(0, current - 1));
    setIsOpen(true);
  }, []);

  const focusNext = useCallback(() => {
    setFocusedIndex((current) => Math.min(pages.length - 1, current + 1));
    setIsOpen(true);
  }, [pages.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        focusPrevious();
      }

      if (event.key === "ArrowRight") {
        focusNext();
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusNext, focusPrevious]);

  function updateScore(matchId: string, side: "home" | "away", value: string) {
    setScores((current) => ({
      ...current,
      [matchId]: {
        home: current[matchId]?.home ?? "",
        away: current[matchId]?.away ?? "",
        [side]: value.replace(/[^\d]/g, "").slice(0, 2)
      }
    }));
  }

  return (
    <main className={`appShell ${isOpen ? "bookletOpen" : "bookletClosed"}`}>
      <section className="introBand" aria-label="Tabelinha Copa 2026">
        <div className="introCopy">
          <p className="kicker">Copa 2026 · Guia interativo</p>
          <h1>Tabelinha Copa 2026</h1>
          <p>Grupos, jogos, classificação e mata-mata em uma experiência compacta.</p>
        </div>

        {!isOpen ? (
          <BookletCover
            isOpen={isOpen}
            onOpen={() => {
              setIsOpen(true);
              setFocusedIndex(0);
            }}
            onClose={() => setIsOpen(false)}
          />
        ) : null}
      </section>

      {isOpen ? (
        <div className="bookletWorkspace">
          <NavigationControls
            isOpen={isOpen}
            currentPage={focusedIndex + 1}
            totalPages={pages.length}
            currentTitle={pages[focusedIndex]?.title ?? "Capa"}
            onToggleOpen={() => setIsOpen((current) => !current)}
            onPrevious={focusPrevious}
            onNext={focusNext}
          />

          <AccordionBooklet
            pages={pages}
            isOpen={isOpen}
            focusedIndex={focusedIndex}
            scores={scores}
            onOpenBooklet={() => setIsOpen(true)}
            onFocusPage={setFocusedIndex}
            onUpdateScore={updateScore}
          />
        </div>
      ) : null}

      {isOpen ? (
        <aside className="sourceStrip" aria-label="Status dos dados">
          <strong>Dados da Copa:</strong> grupos preenchidos; placares e horários seguem editáveis.
          <span>{dataVerificationNote}</span>
          <span>
            Formato base: {tournamentFormat.teams} seleções, {tournamentFormat.groups} grupos de{" "}
            {tournamentFormat.teamsPerGroup}, {tournamentFormat.groupAdvancement}.
          </span>
        </aside>
      ) : null}
    </main>
  );
}
