export interface Usuario {
  id: number;
  email: string;
  nome: string;
  avatar?: string;
  biografia?: string;
  dataCriacao: string;
  ultimoAcesso: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegistroRequest {
  email: string;
  senha: string;
  nome: string;
}

export interface AuthResponse {
  token: string;
  usuarioId: number;
  nome: string;
  email: string;
}
