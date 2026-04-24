import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sucursales-insertar',
  standalone: true,
  templateUrl: './sucursales-insertar.html',
  imports: [CommonModule],  // Asegúrate de agregar CommonModule en imports
})
export class SucursalesInsertar {
  nombreCine = signal('');
  ubicacion = signal('');
  cantidadSalas = signal<number | null>(null);
  submitted = signal(false);
  loading = signal(false);
  success = signal(false);
  serverError = signal<string | null>(null);

  // Función para validar el formulario
  isFormValid(): boolean {
    return (
      this.nombreCine().trim() !== '' &&
      this.ubicacion().trim() !== '' &&
      this.cantidadSalas() !== null &&
      this.cantidadSalas()! > 0
    );
  }

  updateSignal(event: Event, setter: (value: any) => void): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    setter(target.value);
  }

  async sendSucursal(): Promise<void> {
    this.submitted.set(true);
    this.success.set(false);
    this.serverError.set(null);

    if (!this.isFormValid()) return;

    this.loading.set(true);
    try {
      const response = await fetch('http://localhost:3000/api/sucursales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          nombreCine: this.nombreCine(),
          ubicacion: this.ubicacion(),
          cantidadSalas: this.cantidadSalas(),
        }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const result = await response.json();
      this.success.set(true);  // Si la respuesta es exitosa, mostramos un mensaje de éxito
      this.resetValues();  // Restablecer los valores después de un envío exitoso
    } catch (error) {
      this.serverError.set(error instanceof Error ? error.message : 'Error al guardar la sucursal.');
    } finally {
      this.loading.set(false);  // Finaliza la carga
    }
  }

  private resetValues(): void {
    this.nombreCine.set('');
    this.ubicacion.set('');
    this.cantidadSalas.set(null);
    this.submitted.set(false);
  }
}