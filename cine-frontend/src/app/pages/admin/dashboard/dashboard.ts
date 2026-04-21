import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

type Movie = {
  originalName: string,
  commercialName: string,
  imageUrl: string,
  duration: number,
  mainActors: string[],
  director: string,
  rating: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <p class="text-muted">Bienvenido al panel de administración.</p>
  `,
})
export class Dashboard {
    private router = inject(Router);

  movieName = signal("");
  movieList = signal<Movie[]>([]);

ngOnInit() {
  const isLogged = localStorage.getItem('loginSuccess') === 'true';

  if (!isLogged) {
    this.router.navigateByUrl('/login');
    return;
  }

  this.getAllMovies();
}

  logout() {
    localStorage.removeItem('loginSuccess');
    this.router.navigate(['/login']);
  }

  updateMovieName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.movieName.set(input.value);
  }



  async getAllMovies() {
    try {
      const response = await fetch("/api/Movies");

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      this.movieList.set(data);

    } catch (error) {
      console.error("Error getting movies:", error);
      throw error;
    }
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
      this.getAllMovies();

      return data;

    } catch (error) {
      console.error("Error al enviar películas al servidor:", error);
      throw error;
    }
  }
}
