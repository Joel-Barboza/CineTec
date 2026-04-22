import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page';
import { MainLayout } from './layout/main-layout/main-layout';
import { ClientePage } from './pages/cliente/cliente-page';
import { MoviesPage } from './pages/movies/movies-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'cliente', component: ClientePage },
      { path: 'cartelera', component: MoviesPage},
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
      },
      { path: '', redirectTo: 'cliente', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginPage },
  { path: '**', redirectTo: '' }
];