import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subject } from 'rxjs';
import { SessaoPomodoro, EstatisticaTempo } from '../models/pomodoro.model';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/api/pomodoro';

  tempoRestante = signal<number>(0);
  rodando = signal<boolean>(false);
  sessaoAtual = signal<SessaoPomodoro | null>(null);

  private timer$ = new Subject<void>();
  private intervalId: any;

  iniciarSessao(sessao: Partial<SessaoPomodoro>): Observable<SessaoPomodoro> {
    return this.http.post<SessaoPomodoro>(`${this.apiUrl}/iniciar`, {
      ...sessao,
      dataInicio: new Date().toISOString(),
      completada: false
    });
  }

  finalizarSessao(id: number, completada: boolean, observacao?: string): Observable<SessaoPomodoro> {
    return this.http.put<SessaoPomodoro>(`${this.apiUrl}/${id}/finalizar`, {
      dataFim: new Date().toISOString(),
      completada,
      observacao
    });
  }

  listarSessoesPorPeriodo(usuarioId: number, inicio: Date, fim: Date): Observable<SessaoPomodoro[]> {
    return this.http.get<SessaoPomodoro[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
      params: {
        inicio: inicio.toISOString(),
        fim: fim.toISOString()
      }
    });
  }

  obterTotalMinutos(usuarioId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuario/${usuarioId}/total-minutos`);
  }

  obterEstatisticas(usuarioId: number, inicio: Date, fim: Date): Observable<EstatisticaTempo[]> {
    return this.http.get<EstatisticaTempo[]>(`${this.apiUrl}/usuario/${usuarioId}/estatisticas`, {
      params: {
        inicio: inicio.toISOString().split('T')[0],
        fim: fim.toISOString().split('T')[0]
      }
    });
  }

  iniciarTimer(minutos: number): void {
    this.tempoRestante.set(minutos * 60);
    this.rodando.set(true);

    this.intervalId = setInterval(() => {
      const tempo = this.tempoRestante();
      if (tempo > 0) {
        this.tempoRestante.set(tempo - 1);
      } else {
        this.pausarTimer();
        this.timer$.next();
      }
    }, 1000);
  }

  pausarTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.rodando.set(false);
  }

  resetarTimer(): void {
    this.pausarTimer();
    this.tempoRestante.set(0);
    this.sessaoAtual.set(null);
  }

  get timerCompleto$(): Observable<void> {
    return this.timer$.asObservable();
  }
}
