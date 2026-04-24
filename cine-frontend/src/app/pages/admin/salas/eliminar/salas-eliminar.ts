import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Para las peticiones HTTP

@Component({
  selector: 'app-salas-eliminar',
  standalone: true,
  templateUrl: './salas-eliminar.html',
  imports: [CommonModule],
})
export class SalasEliminar {
  salas = signal<any[]>([]);  // Lista de salas
  selected = signal<any | null>(null);  // Sala seleccionada
  loading = signal(false);  // Estado de carga
  error = signal<string | null>(null);  // Manejo de errores

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSalas();  // Obtener las salas cuando el componente se inicializa
  }

  // Obtener todas las salas desde el archivo JSON
  async getSalas(): Promise<void> {
    this.loading.set(true);  // Establecemos el estado de carga a true
    this.error.set(null);  // Limpiamos los errores

    try {
      const response = await this.http.get<any[]>('/salas.json').toPromise();
      this.salas.set(response ?? []);
    } catch (err) {
      console.error('Error al cargar las salas:', err);
      this.error.set('Error al cargar las salas: ' + (err instanceof Error ? JSON.stringify(err) : err));
    } finally {
      this.loading.set(false);  // Finalizamos la carga
    }
  }

  // Eliminar una sala por ID
  deleteSala(id: string): void {
    const updatedSalas = this.salas().filter(sala => sala.id !== id);  // Filtramos la sala seleccionada
    this.salas.set(updatedSalas);  // Actualizamos el signal de salas

    // Opcional: Guardar la lista actualizada de salas en el archivo JSON
    this.saveSalas(updatedSalas);
  }

  // Función para guardar las salas actualizadas
  async saveSalas(salas: any[]): Promise<void> {
    try {
      const response = await this.http.post('/save-salas', { salas }).toPromise();  // Guardar cambios (simulado)
      console.log('Salas guardadas correctamente');
    } catch (error) {
      console.error('Error al guardar las salas', error);
    }
  }

  // Seleccionar una sala para eliminar
  selectSala(sala: any): void {
    this.selected.set(sala);
  }
}