import { Component, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';

type Proyeccion = {
  id?: string;
  pelicula: string;
  sucursal: string;
  sala: number;
  fechaHoraInicio: string;
  fechaHoraFin: string;
};

type ConflictInfo = {
  sala: number;
  sucursal: string;
  fechaHoraInicio: string;
  fechaHoraFin: string;
};

@Component({
  selector: 'app-proyecciones-insertar',
  standalone: true,
  templateUrl: './proyecciones-insertar.html',
  imports: [DatePipe],
})
export class ProyeccionesInsertar {
  pelicula       = signal('');
  sucursal       = signal('');
  sala           = signal<number | null>(null);
  fechaHoraInicio = signal('');
  fechaHoraFin   = signal('');

  submitted    = signal(false);
  loading      = signal(false);
  success      = signal(false);
  serverError  = signal<string | null>(null);
  conflictError = signal<ConflictInfo | null>(null);

  updateSignal(event: Event, setter: (value: any) => void): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    setter(target.value);
  }

  isFormValid = computed(() =>
    this.pelicula().trim() !== '' &&
    this.sucursal().trim() !== '' &&
    this.sala() !== null &&
    this.sala()! > 0 &&
    this.fechaHoraInicio() !== '' &&
    this.fechaHoraFin() !== '' &&
    this.fechaHoraFin() > this.fechaHoraInicio()
  );

  /**
   * Verifica solapamiento de horario en la misma sala y sucursal.
   * Restricción: no se puede asignar dos proyecciones en la misma sala al mismo tiempo.
   * Fórmula: dos intervalos [A, B) y [C, D) se solapan si A < D && B > C.
   */
  private async checkConflict(nueva: Proyeccion): Promise<ConflictInfo | null> {
    try {
      const response = await fetch('/proyecciones.json');
      if (!response.ok) return null;

      const proyecciones: Proyeccion[] = await response.json();

      const nuevaInicio = new Date(nueva.fechaHoraInicio).getTime();
      const nuevaFin    = new Date(nueva.fechaHoraFin).getTime();

      const conflicto = proyecciones.find(p => {
        if (
          p.sala !== nueva.sala ||
          p.sucursal.trim().toLowerCase() !== nueva.sucursal.trim().toLowerCase()
        ) return false;

        const pInicio = new Date(p.fechaHoraInicio).getTime();
        const pFin    = new Date(p.fechaHoraFin).getTime();

        return nuevaInicio < pFin && nuevaFin > pInicio;
      });

      return conflicto
        ? { sala: conflicto.sala, sucursal: conflicto.sucursal, fechaHoraInicio: conflicto.fechaHoraInicio, fechaHoraFin: conflicto.fechaHoraFin }
        : null;
    } catch {
      return null;
    }
  }

  async sendProyeccion(): Promise<void> {
    this.submitted.set(true);
    this.success.set(false);
    this.serverError.set(null);
    this.conflictError.set(null);

    if (!this.isFormValid()) return;

    this.loading.set(true);

    const nueva: Proyeccion = {
      pelicula:        this.pelicula(),
      sucursal:        this.sucursal(),
      sala:            this.sala()!,
      fechaHoraInicio: this.fechaHoraInicio(),
      fechaHoraFin:    this.fechaHoraFin(),
    };

    try {
      const conflicto = await this.checkConflict(nueva);
      if (conflicto) {
        this.conflictError.set(conflicto);
        return;
      }

      const response = await fetch('/api/proyecciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(nueva),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        if (response.status === 409 && body.conflicto) {
          this.conflictError.set(body.conflicto as ConflictInfo);
          return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      await response.json();
      this.success.set(true);
      this.resetValues();
    } catch (error) {
      this.serverError.set(error instanceof Error ? error.message : 'Error al guardar la proyección.');
    } finally {
      this.loading.set(false);
    }
  }

  private resetValues(): void {
    this.pelicula.set('');
    this.sucursal.set('');
    this.sala.set(null);
    this.fechaHoraInicio.set('');
    this.fechaHoraFin.set('');
    this.submitted.set(false);
  }
}
