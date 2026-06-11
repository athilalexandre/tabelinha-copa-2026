type NavigationControlsProps = {
  isOpen: boolean;
  currentPage: number;
  totalPages: number;
  currentTitle: string;
  onToggleOpen: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function NavigationControls({
  isOpen,
  currentPage,
  totalPages,
  currentTitle,
  onToggleOpen,
  onPrevious,
  onNext
}: NavigationControlsProps) {
  return (
    <nav className="bookletNav" aria-label="Navegação da tabelinha">
      <button type="button" onClick={onToggleOpen} aria-expanded={isOpen}>
        {isOpen ? "Fechar" : "Abrir"}
      </button>
      <button type="button" onClick={onPrevious} aria-label="Página anterior">
        &lt;
      </button>
      <div className="pageCounter" aria-live="polite">
        <span>{currentTitle}</span>
        <small>
          {currentPage} / {totalPages}
        </small>
      </div>
      <button type="button" onClick={onNext} aria-label="Próxima página">
        &gt;
      </button>
    </nav>
  );
}
