import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CadernoService } from '../../core/services/caderno.service';
import { PomodoroService } from '../../core/services/pomodoro.service';
import { Caderno } from '../../core/models/caderno.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <header class="header">
        <h1>GFT Starter #7</h1>
        <button class="btn-logout" (click)="sair()">
          <span class="material-icons">logout</span>
        </button>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="material-icons">book</span>
          <div>
            <h3>{{cadernos.length}}</h3>
            <p>Cadernos</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="material-icons">schedule</span>
          <div>
            <h3>{{totalMinutos}}m</h3>
            <p>Tempo Total</p>
          </div>
        </div>
      </div>

      <nav class="nav-menu">
        <a routerLink="/cadernos" class="nav-item">
          <span class="material-icons">menu_book</span>
          <span>Cadernos</span>
        </a>
        <a routerLink="/galeria" class="nav-item">
          <span class="material-icons">photo_library</span>
          <span>Galeria</span>
        </a>
      </nav>

      <div class="recent-section">
        <h2>Cadernos Recentes</h2>
        <div class="cadernos-grid">
          <div *ngFor="let caderno of cadernos.slice(0, 4)"
               class="caderno-card"
               (click)="abrirCaderno(caderno.id)">
            <div class="caderno-header" [style.background]="caderno.corTema || '#667eea'">
              <span class="material-icons">{{obterIcone(caderno.iconeLinguagem)}}</span>
            </div>
            <div class="caderno-body">
              <h3>{{caderno.titulo}}</h3>
              <p>{{caderno.tipoProjeto}}</p>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="caderno.progressoPercentual"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      padding: 24px;
      background: #f7fafc;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1a202c;
    }

    .btn-logout {
      padding: 12px;
      background: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .btn-logout:hover {
      transform: scale(1.05);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .stat-card .material-icons {
      font-size: 40px;
      color: #667eea;
    }

    .stat-card h3 {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      color: #1a202c;
    }

    .stat-card p {
      font-size: 14px;
      color: #718096;
      margin: 0;
    }

    .nav-menu {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .nav-item {
      background: white;
      padding: 20px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #1a202c;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .nav-item:hover {
      transform: translateY(-4px);
    }

    .nav-item .material-icons {
      font-size: 32px;
      color: #667eea;
    }

    .recent-section h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a202c;
    }

    .cadernos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .caderno-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }

    .caderno-card:hover {
      transform: translateY(-4px);
    }

    .caderno-header {
      padding: 24px;
      text-align: center;
    }

    .caderno-header .material-icons {
      font-size: 48px;
      color: white;
    }

    .caderno-body {
      padding: 16px;
    }

    .caderno-body h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #1a202c;
    }

    .caderno-body p {
      font-size: 14px;
      color: #718096;
      margin: 0 0 12px 0;
    }

    .progress-bar {
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #667eea;
      transition: width 0.3s;
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private cadernoService = inject(CadernoService);
  private pomodoroService = inject(PomodoroService);
  private router = inject(Router);

  cadernos: Caderno[] = [];
  totalMinutos = 0;

  ngOnInit(): void {
    const usuarioId = this.authService.obterUsuarioId();
    if (usuarioId) {
      this.cadernoService.listarPorUsuario(usuarioId).subscribe(data => {
        this.cadernos = data;
      });

      this.pomodoroService.obterTotalMinutos(usuarioId).subscribe(total => {
        this.totalMinutos = total;
      });
    }
  }

  abrirCaderno(id: number): void {
    this.router.navigate(['/caderno', id]);
  }

  sair(): void {
    this.authService.logout();
  }

  obterIcone(linguagem?: string): string {
    const icones: Record<string, string> = {
      'angular': 'code',
      'react': 'code',
      'java': 'coffee',
      'javascript': 'javascript',
      'python': 'code',
      'default': 'book'
    };
    return linguagem ? (icones[linguagem.toLowerCase()] || icones.default) : icones.default;
  }
}
