import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FolhaService } from '../../core/services/folha.service';
import { PomodoroService } from '../../core/services/pomodoro.service';
import { AuthService } from '../../core/services/auth.service';
import { Folha } from '../../core/models/caderno.model';

@Component({
  selector: 'app-folha-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page" *ngIf="folha()">
      <header class="header">
        <button class="btn-icon" (click)="voltar()">
          <span class="material-icons">arrow_back</span>
        </button>
        <div class="header-info">
          <span class="numero">Folha {{folha()?.numeroFolha}}</span>
          <h1 [(textContent)]="folha()!.titulo" contenteditable="true" (blur)="salvar()"></h1>
        </div>
        <button class="btn-icon" (click)="salvar()">
          <span class="material-icons">save</span>
        </button>
      </header>

      <div class="toolbar">
        <div class="sticker-options">
          <button *ngFor="let sticker of stickersDisponiveis"
                  (click)="adicionarSticker(sticker)"
                  [title]="sticker.texto">
            <span class="material-icons" [style.color]="sticker.cor">{{sticker.icone}}</span>
          </button>
        </div>
        <div class="pomodoro-widget">
          <button class="btn-pomodoro" (click)="iniciarPomodoro()">
            <span class="material-icons">schedule</span>
            <span>{{formatarTempo()}}</span>
          </button>
        </div>
      </div>

      <div class="editor-area">
        <div class="stickers-layer">
          <div *ngFor="let sticker of stickersAtuais()"
               class="sticker"
               [style.color]="sticker.cor">
            <span class="material-icons">{{sticker.icone}}</span>
            <span class="sticker-label">{{sticker.texto}}</span>
          </div>
        </div>

        <textarea
          [(ngModel)]="folha()!.conteudo"
          (blur)="salvar()"
          class="content-editor"
          placeholder="Comece a escrever seus estudos aqui..."></textarea>
      </div>

      <div class="sections">
        <div class="section">
          <h3>Dúvidas</h3>
          <div class="duvida-item" *ngFor="let duvida of duvidas()">
            <span class="material-icons">help_outline</span>
            <p>{{duvida.pergunta}}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height: 100vh; background: #f7fafc; display: flex; flex-direction: column; }
    .header { background: white; padding: 20px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #e2e8f0; }
    .header-info { flex: 1; }
    .numero { font-size: 12px; color: #667eea; font-weight: 600; text-transform: uppercase; }
    .header-info h1 { font-size: 24px; font-weight: 700; margin: 4px 0 0 0; outline: none; }
    .btn-icon { padding: 12px; background: transparent; border: none; cursor: pointer; border-radius: 8px; transition: background 0.2s; }
    .btn-icon:hover { background: #f7fafc; }
    .toolbar { background: white; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; }
    .sticker-options { display: flex; gap: 8px; }
    .sticker-options button { padding: 8px; background: transparent; border: none; cursor: pointer; border-radius: 8px; transition: background 0.2s; }
    .sticker-options button:hover { background: #f7fafc; }
    .btn-pomodoro { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .editor-area { flex: 1; position: relative; padding: 24px; }
    .stickers-layer { position: absolute; top: 24px; right: 24px; display: flex; flex-direction: column; gap: 12px; z-index: 10; }
    .sticker { display: flex; align-items: center; gap: 8px; background: white; padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-size: 14px; font-weight: 500; }
    .content-editor { width: 100%; height: 100%; min-height: 400px; padding: 20px; background: white; border: 2px solid #e2e8f0; border-radius: 16px; font-size: 16px; font-family: 'Inter', sans-serif; line-height: 1.6; resize: none; }
    .content-editor:focus { outline: none; border-color: #667eea; }
    .sections { padding: 24px; }
    .section h3 { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
    .duvida-item { background: white; padding: 16px; border-radius: 12px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
    .duvida-item .material-icons { color: #667eea; }
    @media (max-width: 768px) { .toolbar { flex-direction: column; gap: 12px; align-items: stretch; } }
  `]
})
export class FolhaEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private folhaService = inject(FolhaService);
  private pomodoroService = inject(PomodoroService);
  private authService = inject(AuthService);

  folha = signal<Folha | null>(null);
  stickersAtuais = signal<any[]>([]);
  duvidas = signal<any[]>([]);

  stickersDisponiveis = [
    { tipo: 'task', icone: 'check_box', cor: '#667eea', texto: 'Task' },
    { tipo: 'code', icone: 'code', cor: '#4facfe', texto: 'Code' },
    { tipo: 'importante', icone: 'priority_high', cor: '#fa709a', texto: 'Importante' },
    { tipo: 'duvida', icone: 'help_outline', cor: '#feca57', texto: 'Dúvida' },
    { tipo: 'conquista', icone: 'star', cor: '#43e97b', texto: 'Conquista' }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.folhaService.obterPorId(id).subscribe(data => {
      this.folha.set(data);
      if (data.stickers) this.stickersAtuais.set(data.stickers);
      if (data.duvidas) this.duvidas.set(data.duvidas);
    });
  }

  salvar(): void {
    const folha = this.folha();
    if (folha) {
      this.folhaService.atualizar(folha.id, folha).subscribe();
    }
  }

  adicionarSticker(sticker: any): void {
    this.stickersAtuais.update(list => [...list, sticker]);
  }

  iniciarPomodoro(): void {
    const folha = this.folha();
    const usuarioId = this.authService.obterUsuarioId();
    if (folha && usuarioId) {
      this.pomodoroService.iniciarSessao({
        usuarioId,
        folhaId: folha.id,
        duracaoMinutos: 25,
        duracaoSegundos: 0,
        tipoSessao: 'estudo',
        completada: false
      }).subscribe(sessao => {
        this.pomodoroService.sessaoAtual.set(sessao);
        this.pomodoroService.iniciarTimer(25);
      });
    }
  }

  formatarTempo(): string {
    const tempo = this.pomodoroService.tempoRestante();
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  voltar(): void {
    this.router.navigate(['/caderno', this.folha()?.caderno || 1]);
  }
}
