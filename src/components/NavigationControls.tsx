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
      <button type="button" className="navCloseBtn" onClick={onToggleOpen} aria-expanded={isOpen}>
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span>Fechar</span>
      </button>

      <div className="navCenterCluster">
        <button type="button" className="navArrowBtn" onClick={onPrevious} aria-label="Página anterior">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <div className="pageCounter" aria-live="polite">
          <span className="currentTitle">{currentTitle}</span>
          <span className="pageDivider">·</span>
          <small className="pageNumbers">{currentPage} de {totalPages}</small>
        </div>

        <button type="button" className="navArrowBtn" onClick={onNext} aria-label="Próxima página">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="navRightPlaceholder" aria-hidden="true" />
    </nav>
  );
}
