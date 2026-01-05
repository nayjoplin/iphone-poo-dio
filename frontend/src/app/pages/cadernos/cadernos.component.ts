import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CadernoService } from '../../core/services/caderno.service';
import { Caderno } from '../../core/models/caderno.model';

@Component({
  selector: 'app-cadernos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page">
      <header class="header">
        <button class="btn-back" (click)="voltar()">
          <span class="material-icons">arrow_back</span>
        </button>
        <h1>Meus Cadernos</h1>
        <button class="btn-add" (click)="modalAberto.set(true)">
          <span class="material-icons">add</span>
        </button>
      </header>

      <div class="cadernos-grid">
        <div *ngFor="let caderno of cadernos()"
             class="caderno-card"
             (click)="abrirCaderno(caderno.id)">
          <div class="card-header" [style.background]="caderno.corTema || '#667eea'">
            <span class="material-icons">{{obterIcone(caderno.iconeLinguagem)}}</span>
            <div class="dificuldade" *ngIf="caderno.notaDificuldade">
              {{caderno.notaDificuldade}}/5
            </div>
          </div>
          <div class="card-body">
            <h3>{{caderno.titulo}}</h3>
            <p class="tipo">{{caderno.tipoProjeto}}</p>
            <p class="finalidade">{{caderno.finalidade}}</p>
            <div class="progress-bar">
              <div class="progress" [style.width.%]="caderno.progressoPercentual"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" *ngIf="modalAberto()">
        <div class="modal-content">
          <h2>Novo Caderno</h2>
          <form (ngSubmit)="criarCaderno()">
            <input [(ngModel)]="novoCaderno.titulo" name="titulo" placeholder="Título do caderno" required>
            <input [(ngModel)]="novoCaderno.tipoProjeto" name="tipo" placeholder="Tipo de projeto">
            <input [(ngModel)]="novoCaderno.finalidade" name="finalidade" placeholder="Finalidade">
            <select [(ngModel)]="novoCaderno.notaDificuldade" name="dificuldade">
              <option [ngValue]="null">Dificuldade</option>
              <option [ngValue]="1">1 - Muito Fácil</option>
              <option [ngValue]="2">2 - Fácil</option>
              <option [ngValue]="3">3 - Médio</option>
              <option [ngValue]="4">4 - Difícil</option>
              <option [ngValue]="5">5 - Muito Difícil</option>
            </select>
            <select [(ngModel)]="novoCaderno.corTema" name="cor">
              <option value="#667eea">Roxo</option>
              <option value="#f093fb">Rosa</option>
              <option value="#4facfe">Azul</option>
              <option value="#43e97b">Verde</option>
              <option value="#fa709a">Coral</option>
              <option value="#feca57">Amarelo</option>
            </select>
            <select [(ngModel)]="novoCaderno.iconeLinguagem" name="linguagem">
              <option value="angular">Angular</option>
              <option value="react">React</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            <textarea [(ngModel)]="novoCaderno.descricao" name="descricao" placeholder="Descrição"></textarea>
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
    .page { min-height: 100vh; padding: 24px; background: #f7fafc; }
    .header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
    .header h1 { flex: 1; font-size: 24px; font-weight: 700; color: #1a202c; margin: 0; }
    .btn-back, .btn-add { padding: 12px; background: white; border: none; border-radius: 12px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .cadernos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .caderno-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; }
    .caderno-card:hover { transform: translateY(-4px); }
    .card-header { padding: 32px; text-align: center; position: relative; }
    .card-header .material-icons { font-size: 56px; color: white; }
    .dificuldade { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.3); padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; color: white; }
    .card-body { padding: 20px; }
    .card-body h3 { font-size: 18px; font-weight: 600; margin: 0 0 8px 0; color: #1a202c; }
    .tipo { font-size: 14px; color: #667eea; font-weight: 500; margin: 0 0 4px 0; }
    .finalidade { font-size: 14px; color: #718096; margin: 0 0 16px 0; }
    .progress-bar { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
    .progress { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.3s; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
    .modal-content { background: white; padding: 32px; border-radius: 20px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; }
    .modal-content h2 { margin: 0 0 24px 0; font-size: 24px; font-weight: 700; }
    .modal-content input, .modal-content select, .modal-content textarea { width: 100%; padding: 12px; margin-bottom: 16px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 14px; font-family: 'Inter', sans-serif; }
    .modal-content textarea { min-height: 100px; resize: vertical; }
    .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn-primary, .btn-secondary { flex: 1; padding: 12px; border: none; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
    .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .btn-secondary { background: #e2e8f0; color: #4a5568; }
    @media (max-width: 768px) { .page { padding: 16px; } }
  `]
})
export class CadernosComponent implements OnInit {
  private authService = inject(AuthService);
  private cadernoService = inject(CadernoService);
  private router = inject(Router);

  cadernos = signal<Caderno[]>([]);
  modalAberto = signal(false);
  novoCaderno: any = {};

  ngOnInit(): void {
    this.carregarCadernos();
  }

  carregarCadernos(): void {
    const usuarioId = this.authService.obterUsuarioId();
    if (usuarioId) {
      this.cadernoService.listarPorUsuario(usuarioId).subscribe(data => {
        this.cadernos.set(data);
      });
    }
  }

  criarCaderno(): void {
    const usuarioId = this.authService.obterUsuarioId();
    if (usuarioId) {
      this.cadernoService.criar({ ...this.novoCaderno, usuarioId }).subscribe(() => {
        this.modalAberto.set(false);
        this.novoCaderno = {};
        this.carregarCadernos();
      });
    }
  }

  abrirCaderno(id: number): void {
    this.router.navigate(['/caderno', id]);
  }

  voltar(): void {
    this.router.navigate(['/dashboard']);
  }

  obterIcone(linguagem?: string): string {
    const icones: Record<string, string> = {
      'angular': 'code', 'react': 'code', 'java': 'coffee',
      'javascript': 'javascript', 'python': 'code', 'default': 'book'
    };
    return linguagem ? (icones[linguagem.toLowerCase()] || icones.default) : icones.default;
  }
}
