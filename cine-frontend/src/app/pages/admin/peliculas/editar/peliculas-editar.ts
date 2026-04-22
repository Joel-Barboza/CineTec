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
  selector: 'app-peliculas-editar',
  standalone: true,
  templateUrl: './peliculas-editar.html',
})
export class PeliculasEditar implements OnInit {
  movieList = signal<Movie[]>([]);
  selected = signal<Movie | null>(null);
  form = signal<Movie>({} as Movie);
  saved = signal(false);

  async ngOnInit(): Promise<void> {
    const response = await fetch('/api/Movies');
    const data: Movie[] = await response.json();
    this.movieList.set(data);
  }

  select(movie: Movie): void {
    this.selected.set(movie);
    this.form.set({ ...movie, mainActors: [...movie.mainActors] });
    this.saved.set(false);
  }

  updateField<K extends keyof Movie>(field: K, value: Movie[K]): void {
    this.form.update(current => ({ ...current, [field]: value }));
  }

  updateActors(value: string): void {
    this.form.update(current => ({
      ...current,
      mainActors: value.split(',').map(a => a.trim()).filter(a => a.length > 0),
    }));
  }

  guardar(): void {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }
}