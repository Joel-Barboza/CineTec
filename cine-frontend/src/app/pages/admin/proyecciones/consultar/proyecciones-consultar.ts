import { Component, signal } from '@angular/core';
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
  selector: 'app-proyecciones-consultar',
  standalone: true,
  templateUrl: './proyecciones-consultar.html',
  imports: [DatePipe],
})
export class ProyeccionesConsultar {
  proyecciones = signal<Proyeccion[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  async getProyecciones(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await fetch('/proyecciones.json');

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Proyeccion[] = await response.json();
      this.proyecciones.set(data);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al obtener las proyecciones.');
    } finally {
      this.loading.set(false);
    }
  }
}
