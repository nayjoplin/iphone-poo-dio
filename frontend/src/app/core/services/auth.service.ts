import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegistroRequest, AuthResponse, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:8081/api/usuarios';
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);

  usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.usuarioId.toString());
        this.carregarUsuarioAtual(response.usuarioId);
      })
    );
  }

  registro(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registro`, request).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuarioId', response.usuarioId.toString());
        this.carregarUsuarioAtual(response.usuarioId);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    this.usuarioAtualSubject.next(null);
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  obterToken(): string | null {
    return localStorage.getItem('token');
  }

  obterUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? parseInt(id) : null;
  }

  private carregarUsuarioAtual(id: number): void {
    this.http.get<Usuario>(`${this.apiUrl}/${id}`).subscribe({
      next: usuario => this.usuarioAtualSubject.next(usuario),
      error: () => this.logout()
    });
  }
}
