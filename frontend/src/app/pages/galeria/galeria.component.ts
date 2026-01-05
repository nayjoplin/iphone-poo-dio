import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MidiaService } from '../../core/services/midia.service';
import { Foto, Video } from '../../core/models/midia.model';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <header class="header">
        <button class="btn-back" (click)="voltar()">
          <span class="material-icons">arrow_back</span>
        </button>
        <h1>Galeria</h1>
      </header>

      <div class="tabs">
        <button [class.active]="abaAtiva() === 'fotos'" (click)="abaAtiva.set('fotos')">
          <span class="material-icons">photo</span>
          Fotos
        </button>
        <button [class.active]="abaAtiva() === 'videos'" (click)="abaAtiva.set('videos')">
          <span class="material-icons">videocam</span>
          Vídeos
        </button>
      </div>

      <div class="content" *ngIf="abaAtiva() === 'fotos'">
        <div class="upload-area">
          <input type="file" #fileInput (change)="uploadFoto($event)" accept="image/*" hidden>
          <button class="btn-upload" (click)="fileInput.click()">
            <span class="material-icons">add_photo_alternate</span>
            <span>Adicionar Foto ({{fotosDoDia()}}/3 hoje)</span>
          </button>
        </div>

        <div class="fotos-grid">
          <div *ngFor="let foto of fotos()" class="foto-card">
            <img [src]="foto.urlFoto" [alt]="foto.nomeArquivo">
            <div class="foto-info">
              <p class="data">{{foto.dataUpload | date:'dd/MM/yyyy'}}</p>
              <p class="legenda" *ngIf="foto.legenda">{{foto.legenda}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content" *ngIf="abaAtiva() === 'videos'">
        <div class="upload-area">
          <input type="file" #videoInput (change)="uploadVideo($event)" accept="video/*" hidden>
          <button class="btn-upload" (click)="videoInput.click()">
            <span class="material-icons">videocam</span>
            <span>Adicionar Vídeo</span>
          </button>
        </div>

        <div class="videos-grid">
          <div *ngFor="let video of videos()" class="video-card">
            <video [src]="video.urlVideo" controls></video>
            <div class="video-info">
              <h3>{{video.titulo}}</h3>
              <p *ngIf="video.tipoVitoria" class="vitoria">{{video.tipoVitoria}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height: 100vh; background: #f7fafc; padding-bottom: 80px; }
    .header { background: white; padding: 20px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #e2e8f0; }
    .header h1 { flex: 1; font-size: 24px; font-weight: 700; margin: 0; }
    .btn-back { padding: 12px; background: transparent; border: none; cursor: pointer; border-radius: 8px; }
    .tabs { display: flex; background: white; border-bottom: 1px solid #e2e8f0; }
    .tabs button { flex: 1; padding: 16px; background: transparent; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 16px; font-weight: 500; color: #718096; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; }
    .tabs button.active { color: #667eea; border-bottom-color: #667eea; }
    .content { padding: 24px; }
    .upload-area { margin-bottom: 24px; }
    .btn-upload { width: 100%; padding: 24px; background: white; border: 2px dashed #cbd5e0; border-radius: 16px; display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer; transition: all 0.3s; color: #667eea; font-weight: 500; }
    .btn-upload:hover { border-color: #667eea; background: #f7fafc; }
    .fotos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
    .foto-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .foto-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
    .foto-info { padding: 12px; }
    .data { font-size: 12px; color: #667eea; font-weight: 600; margin: 0 0 4px 0; }
    .legenda { font-size: 14px; color: #4a5568; margin: 0; }
    .videos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .video-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .video-card video { width: 100%; }
    .video-info { padding: 16px; }
    .video-info h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
    .vitoria { font-size: 14px; color: #43e97b; font-weight: 500; margin: 0; }
    @media (max-width: 768px) { .fotos-grid, .videos-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); } }
  `]
})
export class GaleriaComponent implements OnInit {
  private authService = inject(AuthService);
  private midiaService = inject(MidiaService);
  private router = inject(Router);

  abaAtiva = signal<'fotos' | 'videos'>('fotos');
  fotos = signal<Foto[]>([]);
  videos = signal<Video[]>([]);
  fotosDoDia = signal(0);

  ngOnInit(): void {
    this.carregarMidia();
  }

  carregarMidia(): void {
    const usuarioId = this.authService.obterUsuarioId();
    if (usuarioId) {
      this.midiaService.listarFotosPorUsuario(usuarioId).subscribe(data => {
        this.fotos.set(data);
        const hoje = new Date().toISOString().split('T')[0];
        const contagem = data.filter(f => f.dataUpload === hoje).length;
        this.fotosDoDia.set(contagem);
      });

      this.midiaService.listarVideosPorUsuario(usuarioId).subscribe(data => {
        this.videos.set(data);
      });
    }
  }

  uploadFoto(event: any): void {
    const usuarioId = this.authService.obterUsuarioId();
    const arquivo = event.target.files[0];
    if (usuarioId && arquivo) {
      this.midiaService.uploadFoto(usuarioId, arquivo).subscribe({
        next: () => this.carregarMidia(),
        error: (err) => alert(err.error?.message || 'Erro ao fazer upload')
      });
    }
  }

  uploadVideo(event: any): void {
    const usuarioId = this.authService.obterUsuarioId();
    const arquivo = event.target.files[0];
    if (usuarioId && arquivo) {
      const titulo = prompt('Título do vídeo:') || 'Sem título';
      this.midiaService.uploadVideo(usuarioId, titulo, arquivo).subscribe({
        next: () => this.carregarMidia(),
        error: (err) => alert('Erro ao fazer upload')
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/dashboard']);
  }
}
