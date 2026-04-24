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
  selector: 'app-proyecciones-editar',
  standalone: true,
  templateUrl: './proyecciones-editar.html',
  imports: [DatePipe],
})
export class ProyeccionesEditar implements OnInit {
  proyecciones = signal<Proyeccion[]>([]);
  selected     = signal<Proyeccion | null>(null);
  form         = signal<Proyeccion>({} as Proyeccion);
  saved        = signal(false);

  async ngOnInit(): Promise<void> {
    const response = await fetch('/proyecciones.json');
    const data: Proyeccion[] = await response.json();
    this.proyecciones.set(data);
  }

  select(proyeccion: Proyeccion): void {
    this.selected.set(proyeccion);
    this.form.set({ ...proyeccion });
    this.saved.set(false);
  }

  updateField<K extends keyof Proyeccion>(field: K, value: Proyeccion[K]): void {
    this.form.update(current => ({ ...current, [field]: value }));
  }

  guardar(): void {
    // Actualiza la proyección en la lista local
    this.proyecciones.update(list =>
      list.map(p => p.id === this.form().id ? { ...this.form() } : p)
    );
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
