import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sucursales-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sucursales-editar.html',
})
export class SucursalesEditar {

  nombre = signal('');
  ubicacion = signal('');
  salas = signal<number | null>(null);

  guardar() {
    console.log({
      nombre: this.nombre(),
      ubicacion: this.ubicacion(),
      salas: this.salas()
    });

  }

}