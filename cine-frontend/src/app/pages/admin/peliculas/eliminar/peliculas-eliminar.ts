import { Component, signal, OnInit } from '@angular/core';

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
  selector: 'app-peliculas-eliminar',
  standalone: true,
  templateUrl: './peliculas-eliminar.html',
})
export class PeliculasEliminar implements OnInit {
  movieList = signal<Movie[]>([]);
  selected = signal<Movie | null>(null);
  deleted = signal(false);

  private timer: ReturnType<typeof setTimeout> | null = null;

  async ngOnInit(): Promise<void> {
    const response = await fetch('/api/Movies');
    const data: Movie[] = await response.json();
    this.movieList.set(data);
  }

  select(movie: Movie): void {
    // Cancela el temporizador pendiente antes de cambiar selección
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.selected.set(movie);
    this.deleted.set(false);
  }

  eliminar(): void {
    this.movieList.update(list =>
      list.filter(m => m.originalName !== this.selected()?.originalName)
    );
    this.deleted.set(true);
    this.timer = setTimeout(() => {
      this.selected.set(null);
      this.deleted.set(false);
      this.timer = null;
    }, 1500);
  }
}