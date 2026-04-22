import { Component, signal } from '@angular/core';
 
type Movie = {
  originalName: string;
  commercialName: string;
  imageUrl: string;
  duration: number;
  mainActors: string[];
  director: string;
  rating: string;
};
 
@Component({
  selector: 'app-peliculas-consultar',
  standalone: true,
  templateUrl: './peliculas-consultar.html',
})
export class PeliculasConsultar {
  movieList = signal<Movie[]>([]);
  loading   = signal(false);
  error     = signal<string | null>(null);
 
  async getAllMovies(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
 
    try {
      const response = await fetch('/api/Movies');
 
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
 
      const data: Movie[] = await response.json();
      this.movieList.set(data);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Error al obtener las películas.');
    } finally {
      this.loading.set(false);
    }
  }
}
