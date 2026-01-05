import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Folha } from '../models/caderno.model';

@Injectable({
  providedIn: 'root'
})
export class FolhaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8082/api/folhas';

  criar(folha: Partial<Folha> & { cadernoId: number }): Observable<Folha> {
    return this.http.post<Folha>(this.apiUrl, folha);
  }

  listarPorCaderno(cadernoId: number): Observable<Folha[]> {
    return this.http.get<Folha[]>(`${this.apiUrl}/caderno/${cadernoId}`);
  }

  obterPorId(id: number): Observable<Folha> {
    return this.http.get<Folha>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, folha: Partial<Folha>): Observable<Folha> {
    return this.http.put<Folha>(`${this.apiUrl}/${id}`, folha);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
