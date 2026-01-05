import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caderno } from '../models/caderno.model';

@Injectable({
  providedIn: 'root'
})
export class CadernoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8082/api/cadernos';

  criar(caderno: Partial<Caderno>): Observable<Caderno> {
    return this.http.post<Caderno>(this.apiUrl, caderno);
  }

  listarPorUsuario(usuarioId: number): Observable<Caderno[]> {
    return this.http.get<Caderno[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  obterPorId(id: number): Observable<Caderno> {
    return this.http.get<Caderno>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, caderno: Partial<Caderno>): Observable<Caderno> {
    return this.http.put<Caderno>(`${this.apiUrl}/${id}`, caderno);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarProgresso(id: number, progresso: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/progresso?progresso=${progresso}`, {});
  }
}
