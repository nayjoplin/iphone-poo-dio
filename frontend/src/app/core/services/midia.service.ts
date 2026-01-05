import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foto, Video } from '../models/midia.model';

@Injectable({
  providedIn: 'root'
})
export class MidiaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8084/api/midia';

  uploadFoto(usuarioId: number, arquivo: File, cadernoId?: number, folhaId?: number, legenda?: string): Observable<Foto> {
    const formData = new FormData();
    formData.append('usuarioId', usuarioId.toString());
    formData.append('arquivo', arquivo);

    if (cadernoId) formData.append('cadernoId', cadernoId.toString());
    if (folhaId) formData.append('folhaId', folhaId.toString());
    if (legenda) formData.append('legenda', legenda);

    return this.http.post<Foto>(`${this.apiUrl}/foto`, formData);
  }

  uploadVideo(usuarioId: number, titulo: string, arquivo: File, cadernoId?: number, descricao?: string, tipoVitoria?: string): Observable<Video> {
    const formData = new FormData();
    formData.append('usuarioId', usuarioId.toString());
    formData.append('titulo', titulo);
    formData.append('arquivo', arquivo);

    if (cadernoId) formData.append('cadernoId', cadernoId.toString());
    if (descricao) formData.append('descricao', descricao);
    if (tipoVitoria) formData.append('tipoVitoria', tipoVitoria);

    return this.http.post<Video>(`${this.apiUrl}/video`, formData);
  }

  listarFotosPorUsuario(usuarioId: number): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.apiUrl}/fotos/usuario/${usuarioId}`);
  }

  listarFotosPorData(usuarioId: number, data: Date): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.apiUrl}/fotos/usuario/${usuarioId}/data`, {
      params: { data: data.toISOString().split('T')[0] }
    });
  }

  listarVideosPorUsuario(usuarioId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/videos/usuario/${usuarioId}`);
  }

  deletarFoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/foto/${id}`);
  }

  deletarVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/video/${id}`);
  }
}
