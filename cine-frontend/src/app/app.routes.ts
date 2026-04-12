import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home-page';
import { MoviesPage } from './pages/movies/movies-page';

export const routes: Routes = [

    {
        path: '',
        component: HomePage,
    },
    {
        path: "movies",
        component: MoviesPage,
    },
    {
        path: '**',
        redirectTo: '',
    }

];
