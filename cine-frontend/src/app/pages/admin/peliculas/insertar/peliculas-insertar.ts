import { Component, signal, computed } from '@angular/core';

interface Protagonista {
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-peliculas-insertar',
  standalone: true,
  templateUrl: './peliculas-insertar.html',
})
export class PeliculasInsertar {
  nombreOriginal  = signal('');
  nombreComercial = signal('');
  imageUrl        = signal('');
  duracion        = signal<number | null>(null);
  director        = signal('');
  clasificacion   = signal('');
  protagonistas   = signal<Protagonista[]>([]);
  nuevoNombre     = signal('');
  nuevoApellido   = signal('');
  submitted       = signal(false);
  loading         = signal(false);
  success         = signal(false);
  serverError     = signal<string | null>(null);

  updateSignal(event: Event, setter: (value: any) => void): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    setter(target.value);
  }

  isFormValid = computed(() =>
    this.nombreOriginal().trim() !== '' &&
    this.nombreComercial().trim() !== '' &&
    this.imageUrl().trim() !== '' &&
    this.duracion() !== null &&
    this.duracion()! > 0 &&
    this.director().trim() !== '' &&
    this.clasificacion().trim() !== '' &&
    this.protagonistas().length > 0
  );

  addProtagonista(): void {
    if (!this.nuevoNombre().trim() || !this.nuevoApellido().trim()) return;
    this.protagonistas.update(list => [
      ...list,
      { nombre: this.nuevoNombre().trim(), apellido: this.nuevoApellido().trim() },
    ]);
    this.nuevoNombre.set('');
    this.nuevoApellido.set('');
  }

  removeProtagonista(index: number): void {
    this.protagonistas.update(list => list.filter((_, i) => i !== index));
  }

  async sendMovie(): Promise<void> {
    this.submitted.set(true);
    this.success.set(false);
    this.serverError.set(null);

    if (!this.isFormValid()) return;

    this.loading.set(true);
    try {
      const response = await fetch('/api/Movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify([this.nombreOriginal(), this.clasificacion()]),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      await response.json();
      this.success.set(true);
      this.resetValues();
    } catch (error) {
      this.serverError.set(error instanceof Error ? error.message : 'Error al guardar la película.');
    } finally {
      this.loading.set(false);
    }
  }

  private resetValues(): void {
    this.nombreOriginal.set('');
    this.nombreComercial.set('');
    this.imageUrl.set('');
    this.duracion.set(null);
    this.director.set('');
    this.clasificacion.set('');
    this.submitted.set(false);
    this.protagonistas.set([]);
  }
}