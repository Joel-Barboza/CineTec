import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBuilding, faChair, faChevronDown, faChevronRight, faCircle, faClapperboard, faClock, faFilm, faMapLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';


interface NavSection {
  label: string;
  icon: IconDefinition;
  base: string;
  links: { label: string; path: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  openMenu: string | null = null;
  private router = inject(Router);
  

  

  chevronRight = faChevronRight;
  chevronDown = faChevronDown;

  sections: NavSection[] = [
    {
      label: 'Películas',
      icon: faClapperboard,
      base: 'peliculas',
      links: [
        { label: 'Consultar', path: 'peliculas/consultar' },
        { label: 'Insertar',  path: 'peliculas/insertar' },
        { label: 'Editar',    path: 'peliculas/editar' },
        { label: 'Eliminar',  path: 'peliculas/eliminar' },
      ],
    },
    {
      label: 'Sucursales',
      icon: faBuilding,
      base: 'sucursales',
      links: [
        { label: 'Consultar', path: 'sucursales/consultar' },
        { label: 'Insertar',  path: 'sucursales/insertar' },
        { label: 'Editar',    path: 'sucursales/editar' },
        { label: 'Eliminar',  path: 'sucursales/eliminar' },
      ],
    },
    {
      label: 'Salas',
      icon: faChair,
      base: 'salas',
      links: [
        { label: 'Consultar', path: 'salas/consultar' },
        { label: 'Insertar',  path: 'salas/insertar' },
        { label: 'Editar',    path: 'salas/editar' },
        { label: 'Eliminar',  path: 'salas/eliminar' },
      ],
    },
    {
      label: 'Proyecciones',
      icon: faClock,
      base: 'proyecciones',
      links: [
        { label: 'Consultar', path: 'proyecciones/consultar' },
        { label: 'Insertar',  path: 'proyecciones/insertar' },
        { label: 'Editar',    path: 'proyecciones/editar' },
        { label: 'Eliminar',  path: 'proyecciones/eliminar' },
      ],
    },
  ];

  toggle(base: string): void {
    this.openMenu = this.openMenu === base ? null : base;
  }

  isOpen(base: string): boolean {
    return this.openMenu === base;
  }

  
  logout() {
    localStorage.removeItem('loginSuccess');
    this.router.navigate(['/login']);
  }
}
