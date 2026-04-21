import { Routes } from '@angular/router';
import { MoviesPage } from './pages/movies/movies-page';
import { LoginPage } from './pages/login/login-page';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'movies', component: MoviesPage },

      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES)
      }
    ]
  },

  { path: 'login', component: LoginPage },

  { path: '**', redirectTo: '' }
];
