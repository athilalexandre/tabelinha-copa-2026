type BookletCoverProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function BookletCover({ isOpen, onOpen, onClose }: BookletCoverProps) {
  return (
    <div className="coverCard" aria-label="Capa da tabelinha">
      <div className="coverGlow" aria-hidden="true" />
      <div className="coverFace">
        <span className="coverYear">FIFA World Cup 2026</span>
        <h2>Tabelinha Copa 2026</h2>
        <p>Guia compacto com grupos, jogos, classificação e chaveamento.</p>
        <dl className="coverStats" aria-label="Resumo do torneio">
          <div>
            <dt>Seleções</dt>
            <dd>48</dd>
          </div>
          <div>
            <dt>Grupos</dt>
            <dd>12</dd>
          </div>
          <div>
            <dt>Mata-mata</dt>
            <dd>32</dd>
          </div>
        </dl>
        <button
          className="primaryButton"
          type="button"
          onClick={isOpen ? onClose : onOpen}
          aria-expanded={isOpen}
        >
          {isOpen ? "Fechar tabelinha" : "Abrir tabelinha"}
        </button>
      </div>
    </div>
  );
}
