export interface Caderno {
  id: number;
  usuarioId: number;
  titulo: string;
  tipoProjeto?: string;
  finalidade?: string;
  dataInicio?: string;
  dataFim?: string;
  notaDificuldade?: number;
  corTema?: string;
  iconeLinguagem?: string;
  descricao?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  progressoPercentual: number;
  folhas?: Folha[];
  palavrasChave?: PalavraChave[];
}

export interface Folha {
  id: number;
  titulo: string;
  numeroFolha: number;
  dataEstudo?: string;
  conteudo?: string;
  tipoSecao?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  stickers?: Sticker[];
  duvidas?: Duvida[];
  snippets?: Snippet[];
}

export interface Sticker {
  id?: number;
  tipo: string;
  icone: string;
  cor: string;
  posicaoX?: number;
  posicaoY?: number;
  texto?: string;
}

export interface Duvida {
  id?: number;
  pergunta: string;
  resposta?: string;
  resolvida: boolean;
  dataCriacao: string;
  dataResolucao?: string;
}

export interface Snippet {
  id?: number;
  titulo: string;
  codigo: string;
  linguagem: string;
  descricao?: string;
  dataCriacao: string;
}

export interface PalavraChave {
  id?: number;
  termo: string;
  definicao?: string;
  categoria?: string;
}
