import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Para las peticiones HTTP

@Component({
  selector: 'app-salas-consultar',
  standalone: true,
  templateUrl: './salas-consultar.html',
  imports: [CommonModule],  // Asegúrate de agregar CommonModule en imports
})
export class SalasConsultar implements OnInit {
  salas = signal<any[]>([]);  // Lista de salas
  loading = signal(false);  // Estado de carga
  error = signal<string | null>(null);  // Manejo de errores

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSalas();  // Llamamos a la función para obtener las salas cuando el componente se inicializa
  }

  // Obtener todas las salas desde el archivo JSON
  async getSalas(): Promise<void> {
    this.loading.set(true);  // Establecemos el estado de carga a true
    this.error.set(null);  // Limpiamos los errores

    try {
      const response = await this.http.get<any[]>('/salas.json').toPromise();  // Ruta directa al archivo JSON
      this.salas.set(response ?? []);  // Guardamos la respuesta en el signal de salas
    } catch (err) {
      console.error('Error al cargar las salas:', err);  // Log detallado del error en la consola
      this.error.set('Error al cargar las salas: ' + (err instanceof Error ? JSON.stringify(err) : err));  // Mostrar error detallado
    } finally {
      this.loading.set(false);  // Establecemos el estado de carga a false una vez que se termine la petición
    }
  }
}