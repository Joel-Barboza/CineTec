import { Component, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

type Proyeccion = {
  id: string;
  pelicula: string;
  sucursal: string;
  sala: number;
  fechaHoraInicio: string;
  fechaHoraFin: string;
};

@Component({
  selector: 'app-proyecciones-eliminar',
  standalone: true,
  templateUrl: './proyecciones-eliminar.html',
  imports: [DatePipe],
})
export class ProyeccionesEliminar implements OnInit {
  proyecciones = signal<Proyeccion[]>([]);
  selected     = signal<Proyeccion | null>(null);
  deleted      = signal(false);

  private timer: ReturnType<typeof setTimeout> | null = null;

  async ngOnInit(): Promise<void> {
    const response = await fetch('/proyecciones.json');
    const data: Proyeccion[] = await response.json();
    this.proyecciones.set(data);
  }

  select(proyeccion: Proyeccion): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.selected.set(proyeccion);
    this.deleted.set(false);
  }

  eliminar(): void {
    this.proyecciones.update(list =>
      list.filter(p => p.id !== this.selected()?.id)
    );
    this.deleted.set(true);
    this.timer = setTimeout(() => {
      this.selected.set(null);
      this.deleted.set(false);
      this.timer = null;
    }, 1500);
  }
}
