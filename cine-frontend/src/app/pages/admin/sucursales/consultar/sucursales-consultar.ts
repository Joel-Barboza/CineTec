import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sucursales-consultar',
  standalone: true,
  templateUrl: './sucursales-consultar.html',
  imports: [CommonModule],  // Asegúrate de agregar CommonModule en imports
})
export class SucursalesConsultar implements OnInit {
  sucursales = signal<any[]>([]);  // Lista de sucursales
  loading = signal(false);  // Estado de carga
  error = signal<string | null>(null);  // Manejo de errores

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSucursales();  // Llamamos a la función para obtener las sucursales cuando el componente se inicializa
  }

  // Obtener todas las sucursales desde el archivo JSON
  async getSucursales(): Promise<void> {
    this.loading.set(true); // Establecemos el estado de carga a true
    this.error.set(null); // Limpiamos los errores

    try {
      // Realizamos la solicitud GET al archivo JSON directamente
      const response = await this.http.get<any[]>('/sucursales.json').toPromise();  // URL directa al archivo JSON
      this.sucursales.set(response ?? []);  // Guardamos la respuesta en el signal de sucursales
    } catch (err) {
      console.error('Error al cargar las sucursales:', err);  // Log detallado del error en la consola
      this.error.set('Error al cargar las sucursales: ' + (err instanceof Error ? JSON.stringify(err) : err));  // Mostrar error detallado
    } finally {
      this.loading.set(false); // Establecemos el estado de carga a false una vez que se termine la petición
    }
  }
}