import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salas-insertar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salas-insertar.html',
})
export class SalasInsertar {

  id = signal('');
  sucursal = signal('');
  filas = signal<number | null>(null);
  columnas = signal<number | null>(null);
  capacidad = signal<number | null>(null);

  guardar() {
    console.log({
      id: this.id(),
      sucursal: this.sucursal(),
      filas: this.filas(),
      columnas: this.columnas(),
      capacidad: this.capacidad()
    });
  }

}