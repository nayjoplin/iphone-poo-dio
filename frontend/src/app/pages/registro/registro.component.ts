import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegistroRequest } from '../../core/models/usuario.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="registro-container">
      <div class="registro-card">
        <div class="logo-section">
          <h1>Criar Conta</h1>
          <p>Comece sua jornada de estudos</p>
        </div>

        <form (ngSubmit)="registrar()" class="registro-form">
          <div class="form-group">
            <label for="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              [(ngModel)]="dados.nome"
              name="nome"
              placeholder="Seu nome"
              required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="dados.email"
              name="email"
              placeholder="seu@email.com"
              required>
          </div>

          <div class="form-group">
            <label for="senha">Senha</label>
            <input
              type="password"
              id="senha"
              [(ngModel)]="dados.senha"
              name="senha"
              placeholder="••••••••"
              required>
          </div>

          <button type="submit" class="btn-primary" [disabled]="carregando">
            <span *ngIf="!carregando">Criar Conta</span>
            <span *ngIf="carregando">Criando...</span>
          </button>

          <div class="login-link">
            <p>Já tem conta? <a routerLink="/login">Fazer login</a></p>
          </div>

          <div class="erro" *ngIf="erro">{{ erro }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .registro-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .registro-card {
      background: white;
      border-radius: 24px;
      padding: 48px;
      max-width: 440px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .logo-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo-section h1 {
      font-size: 28px;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 8px 0;
    }

    .logo-section p {
      font-size: 16px;
      color: #718096;
      margin: 0;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      transition: all 0.3s;
      font-family: 'Inter', sans-serif;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      font-family: 'Inter', sans-serif;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .login-link {
      margin-top: 24px;
      text-align: center;
    }

    .login-link p {
      font-size: 14px;
      color: #718096;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .erro {
      margin-top: 16px;
      padding: 12px;
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      color: #c33;
      font-size: 14px;
      text-align: center;
    }

    @media (max-width: 640px) {
      .registro-card {
        padding: 32px 24px;
      }
    }
  `]
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  dados: RegistroRequest = {
    nome: '',
    email: '',
    senha: ''
  };

  carregando = false;
  erro = '';

  registrar(): void {
    this.carregando = true;
    this.erro = '';

    this.authService.registro(this.dados).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.erro = 'Erro ao criar conta. Tente novamente.';
        this.carregando = false;
      }
    });
  }
}
