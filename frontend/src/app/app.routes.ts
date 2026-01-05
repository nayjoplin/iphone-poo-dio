import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cadernos',
    loadComponent: () => import('./pages/cadernos/cadernos.component').then(m => m.CadernosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'caderno/:id',
    loadComponent: () => import('./pages/caderno-detalhes/caderno-detalhes.component').then(m => m.CadernoDetalhesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'folha/:id',
    loadComponent: () => import('./pages/folha-editor/folha-editor.component').then(m => m.FolhaEditorComponent),
    canActivate: [authGuard]
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria/galeria.component').then(m => m.GaleriaComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
