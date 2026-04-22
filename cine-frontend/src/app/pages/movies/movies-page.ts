import { Component, signal } from '@angular/core';

type Movie = {
  "originalName": string,
  "commercialName": string,
  "imageUrl": string,
  "duration": number,
  "mainActors": string[],
  "director": string,
  "rating": string
}

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies-page.html',
})
export class MoviesPage {
  movies = signal<Movie[]>([]);
  loadingMovies = signal(false);

  posterInitials(name: string) {
    return name.substring(0, 2).toUpperCase();
  }

    async getAllMovies() {
    this.loadingMovies.set(true);
    try {
      const res = await fetch('/api/Movies');
      const data = await res.json();
      this.movies.set(data);
    } catch (e) {
      console.error(e);
    }
    this.loadingMovies.set(false);
  }

}
