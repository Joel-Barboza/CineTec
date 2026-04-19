import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-peliculas-insertar',
  standalone: true,
  templateUrl: './peliculas-insertar.html',
})
export class PeliculasInsertar {


  movieName = signal("");

  updateMovieName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.movieName.set(input.value);
  }

  async sendMovie() {
    try {
      const response = await fetch("/api/Movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(this.movieName())
      });

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

}
