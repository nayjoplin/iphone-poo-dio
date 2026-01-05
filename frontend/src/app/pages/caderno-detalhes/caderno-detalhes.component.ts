import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CadernoService } from '../../core/services/caderno.service';
import { FolhaService } from '../../core/services/folha.service';
import { Caderno, Folha } from '../../core/models/caderno.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-caderno-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="page" *ngIf="caderno()">
      <header class="header" [style.background]="caderno()?.corTema || '#667eea'">
        <button class="btn-back" (click)="voltar()">
          <span class="material-icons">arrow_back</span>
        </button>
        <div class="header-info">
          <h1>{{caderno()?.titulo}}</h1>
          <p>{{caderno()?.tipoProjeto}} • {{caderno()?.finalidade}}</p>
        </div>
        <button class="btn-add" (click)="modalAberto.set(true)">
          <span class="material-icons">add</span>
        </button>
      </header>

      <div class="content">
        <div class="folhas-list">
          <h2>Folhas de Estudo</h2>
          <div class="folha-item" *ngFor="let folha of folhas()" (click)="abrirFolha(folha.id)">
            <div class="folha-numero">{{folha.numeroFolha}}</div>
            <div class="folha-info">
              <h3>{{folha.titulo}}</h3>
              <p>{{folha.dataEstudo | date:'dd/MM/yyyy'}}</p>
            </div>
            <span class="material-icons">chevron_right</span>
          </div>
          <div class="empty" *ngIf="folhas().length === 0">
            <p>Nenhuma folha criada ainda</p>
          </div>
        </div>
      </div>

      <div class="modal" *ngIf="modalAberto()">
        <div class="modal-content">
          <h2>Nova Folha</h2>
          <form (ngSubmit)="criarFolha()">
            <input [(ngModel)]="novaFolha.titulo" name="titulo" placeholder="Título da folha" required>
            <input [(ngModel)]="novaFolha.numeroFolha" name="numero" type="number" placeholder="Número" required>
            <input [(ngModel)]="novaFolha.dataEstudo" name="data" type="date">
            <select [(ngModel)]="novaFolha.tipoSecao" name="tipo">
              <option value="setup">Setup da Máquina</option>
              <option value="sintaxe">Cheat Sheet de Sintaxe</option>
              <option value="snippets">Snippets</option>
              <option value="conceito">Anatomia de Conceito</option>
              <option value="bugs">Bug Tracker</option>
              <option value="projetos">Log de Projetos</option>
            </select>
            <div class="modal-actions">
              <button type="button" class="btn-secondary" (click)="modalAberto.set(false)">Cancelar</button>
              <button type="submit" class="btn-primary">Criar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height: 100vh; background: #f7fafc; }
    .header { padding: 32px 24px; color: white; display: flex; align-items: center; gap: 16px; }
    .header-info { flex: 1; }
    .header h1 { font-size: 28px; font-weight: 700; margin: 0 0 8px 0; }
    .header p { margin: 0; opacity: 0.9; }
    .btn-back, .btn-add { padding: 12px; background: rgba(255,255,255,0.2); border: none; border-radius: 12px; cursor: pointer; color: white; }
    .content { padding: 24px; }
    .folhas-list h2 { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
    .folha-item { background: white; padding: 16px; border-radius: 12px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: transform 0.2s; }
    .folha-item:hover { transform: translateX(4px); }
    .folha-numero { width: 48px; height: 48px; background: #667eea; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; }
    .folha-info { flex: 1; }
    .folha-info h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
    .folha-info p { font-size: 14px; color: #718096; margin: 0; }
    .empty { text-align: center; padding: 48px; color: #718096; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
    .modal-content { background: white; padding: 32px; border-radius: 20px; max-width: 500px; width: 100%; }
    .modal-content h2 { margin: 0 0 24px 0; font-size: 24px; font-weight: 700; }
    .modal-content input, .modal-content select { width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 14px; font-family: 'Inter', sans-serif; }
    .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn-primary, .btn-secondary { flex: 1; padding: 12px; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; }
    .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .btn-secondary { background: #e2e8f0; color: #4a5568; }
  `]
})
export class CadernoDetalhesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cadernoService = inject(CadernoService);
  private folhaService = inject(FolhaService);

  caderno = signal<Caderno | null>(null);
  folhas = signal<Folha[]>([]);
  modalAberto = signal(false);
  novaFolha: any = {};

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cadernoService.obterPorId(id).subscribe(data => {
      this.caderno.set(data);
      this.carregarFolhas(id);
    });
  }

  carregarFolhas(cadernoId: number): void {
    this.folhaService.listarPorCaderno(cadernoId).subscribe(data => {
      this.folhas.set(data);
    });
  }

  criarFolha(): void {
    const cadernoId = this.caderno()?.id;
    if (cadernoId) {
      this.folhaService.criar({ ...this.novaFolha, cadernoId }).subscribe(() => {
        this.modalAberto.set(false);
        this.novaFolha = {};
        this.carregarFolhas(cadernoId);
      });
    }
  }

  abrirFolha(id: number): void {
    this.router.navigate(['/folha', id]);
  }

  voltar(): void {
    this.router.navigate(['/cadernos']);
  }
}
