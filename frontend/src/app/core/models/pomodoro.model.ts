export interface SessaoPomodoro {
  id?: number;
  usuarioId: number;
  cadernoId?: number;
  folhaId?: number;
  duracaoMinutos: number;
  duracaoSegundos: number;
  tipoSessao: string;
  dataInicio: string;
  dataFim?: string;
  completada: boolean;
  observacao?: string;
}

export interface EstatisticaTempo {
  id: number;
  usuarioId: number;
  cadernoId?: number;
  data: string;
  totalMinutos: number;
  totalSessoes: number;
  sessoesCompletadas: number;
}
