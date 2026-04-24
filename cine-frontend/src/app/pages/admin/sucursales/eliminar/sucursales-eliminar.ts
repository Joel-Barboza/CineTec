import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sucursales-eliminar',
  standalone: true,
  templateUrl: './sucursales-eliminar.html',
  imports: [CommonModule],
})
export class SucursalesEliminar {
  sucursales = signal<any[]>([]);  // Lista de sucursales
  selected = signal<any | null>(null);  // Sucursal seleccionada
  loading = signal(false);  // Estado de carga
  error = signal<string | null>(null);  // Manejo de errores

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSucursales();  // Obtener las sucursales cuando el componente se inicializa
  }

  // Obtener todas las sucursales desde el archivo JSON
  async getSucursales(): Promise<void> {
    this.loading.set(true);  // Establecemos el estado de carga a true
    this.error.set(null); // Limpiamos los errores

    try {
      const response = await this.http.get<any[]>('/sucursales.json').toPromise();
      this.sucursales.set(response ?? []);  // Guardamos la respuesta en el signal de sucursales
    } catch (err) {
      console.error('Error al cargar las sucursales:', err);
      this.error.set('Error al cargar las sucursales: ' + (err instanceof Error ? JSON.stringify(err) : err));  // Mostrar error detallado
    } finally {
      this.loading.set(false);  // Finalizamos la carga
    }
  }

  // Eliminar una sucursal por ID
  deleteSucursal(id: string): void {
    // Filtrar la lista de sucursales, eliminando solo la sucursal con el id seleccionado
    const updatedSucursales = this.sucursales().filter(sucursal => sucursal.id !== id);

    // Actualizar el signal de sucursales con la nueva lista (sin la sucursal eliminada)
    this.sucursales.set(updatedSucursales);

    // Opcional: Aquí también puedes agregar lógica para guardar el archivo actualizado
    // con la nueva lista de sucursales
    this.saveSucursales(updatedSucursales);
  }

  // Función para guardar las sucursales actualizadas (si deseas persistir los cambios)
  async saveSucursales(sucursales: any[]): Promise<void> {
    try {
      // Aquí, normalmente necesitaríamos un backend para guardar este archivo
      const response = await this.http.post('/save-sucursales', { sucursales }).toPromise();
      console.log('Sucursales guardadas correctamente');
    } catch (error) {
      console.error('Error al guardar las sucursales', error);
    }
  }

  // Seleccionar una sucursal para eliminar
  selectSucursal(sucursal: any): void {
    this.selected.set(sucursal);  // Establecemos la sucursal seleccionada
  }
}