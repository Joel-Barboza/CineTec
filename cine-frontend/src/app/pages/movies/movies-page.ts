import { Component, signal } from '@angular/core';

type Movie = { "originalName": string, "commercialName": string, "imageUrl": string, "duration": number, "mainActors": string[], "director": string, "rating": string }

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies-page.html',
})
export class MoviesPage {
  movieName = signal("");
  movieList = signal<Movie[]>([]);

  updateMovieName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.movieName.set(input.value);
  }

  async sendMovie() {

    try {
      const response = await fetch("/api/Movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset:UTF-8",
        },
        body: JSON.stringify(this.movieName()) // el mensaje que se envia
      })

      if (!response.ok) {
        throw new Error("No hubo respuesta del servidor");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error al enviar películas al servidor:", error);
      throw error;
    }
  }

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
