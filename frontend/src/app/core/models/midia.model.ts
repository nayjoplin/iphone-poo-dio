export interface Foto {
  id: number;
  usuarioId: number;
  cadernoId?: number;
  folhaId?: number;
  nomeArquivo: string;
  urlFoto: string;
  legenda?: string;
  dataUpload: string;
  dataCriacao: string;
}

export interface Video {
  id: number;
  usuarioId: number;
  cadernoId?: number;
  titulo: string;
  nomeArquivo: string;
  urlVideo: string;
  tamanhoBytes: number;
  duracaoSegundos?: number;
  descricao?: string;
  tipoVitoria?: string;
  dataCriacao: string;
}
