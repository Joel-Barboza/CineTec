import { Component, signal } from '@angular/core';

type Movie = { "originalName": string, "commercialName": string, "imageUrl": string, "duration": number, "mainActors": string[], "director": string, "rating": string }

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies-page.html',
})
export class MoviesPage {
  movieList = signal<Movie[]>([]);


  async getAllMovies() {
    try {
      const response = await fetch("/api/Movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      this.movieList.set(data);
      return;
    } catch (error) {
      console.error("Error getting movies:", error);
      throw error;
    }
  }

}
