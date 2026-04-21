import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard')
            .then(m => m.Dashboard),
      },

      {
        path: 'peliculas',
        children: [
          {
            path: 'consultar',
            loadComponent: () =>
              import('./peliculas/consultar/peliculas-consultar')
                .then(m => m.PeliculasConsultar),
          },
          {
            path: 'insertar',
            loadComponent: () =>
              import('./peliculas/insertar/peliculas-insertar')
                .then(m => m.PeliculasInsertar),
          },
          {
            path: 'editar',
            loadComponent: () =>
              import('./peliculas/editar/peliculas-editar')
                .then(m => m.PeliculasEditar),
          },
          {
            path: 'eliminar',
            loadComponent: () =>
              import('./peliculas/eliminar/peliculas-eliminar')
                .then(m => m.PeliculasEliminar),
          },
        ]
      },

      {
        path: 'sucursales',
        children: [
          {
            path: 'consultar',
            loadComponent: () =>
              import('./sucursales/consultar/sucursales-consultar')
                .then(m => m.SucursalesConsultar),
          },
          {
            path: 'insertar',
            loadComponent: () =>
              import('./sucursales/insertar/sucursales-insertar')
                .then(m => m.SucursalesInsertar),
          },
          {
            path: 'editar',
            loadComponent: () =>
              import('./sucursales/editar/sucursales-editar')
                .then(m => m.SucursalesEditar),
          },
          {
            path: 'eliminar',
            loadComponent: () =>
              import('./sucursales/eliminar/sucursales-eliminar')
                .then(m => m.SucursalesEliminar),
          },
        ]
      },

      {
        path: 'salas',
        children: [
          {
            path: 'consultar',
            loadComponent: () =>
              import('./salas/consultar/salas-consultar')
                .then(m => m.SalasConsultar),
          },
          {
            path: 'insertar',
            loadComponent: () =>
              import('./salas/insertar/salas-insertar')
                .then(m => m.SalasInsertar),
          },
          {
            path: 'editar',
            loadComponent: () =>
              import('./salas/editar/salas-editar')
                .then(m => m.SalasEditar),
          },
          {
            path: 'eliminar',
            loadComponent: () =>
              import('./salas/eliminar/salas-eliminar')
                .then(m => m.SalasEliminar),
          },
        ]
      },

      {
        path: 'proyecciones',
        children: [
          {
            path: 'consultar',
            loadComponent: () =>
              import('./proyecciones/consultar/proyecciones-consultar')
                .then(m => m.ProyeccionesConsultar),
          },
          {
            path: 'insertar',
            loadComponent: () =>
              import('./proyecciones/insertar/proyecciones-insertar')
                .then(m => m.ProyeccionesInsertar),
          },
          {
            path: 'editar',
            loadComponent: () =>
              import('./proyecciones/editar/proyecciones-editar')
                .then(m => m.ProyeccionesEditar),
          },
          {
            path: 'eliminar',
            loadComponent: () =>
              import('./proyecciones/eliminar/proyecciones-eliminar')
                .then(m => m.ProyeccionesEliminar),
          },
        ]
      },
    ]
  }
];