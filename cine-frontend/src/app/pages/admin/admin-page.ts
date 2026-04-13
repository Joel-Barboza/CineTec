import { Component, signal, effect, OnInit } from '@angular/core';

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
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin-page.html',
})
export class AdminPage implements OnInit {

  userValue = signal<string>("");
  passwordValue = signal<string>("");
  loginSuccess = signal<boolean | null>(null);
  movieName = signal("");
  movieList = signal<Movie[]>([]);

  constructor() {
    effect(() => {
      localStorage.setItem('username', this.userValue());
    });

    effect(() => {
      localStorage.setItem('loginSuccess', JSON.stringify(this.loginSuccess()));
    });
  }

  ngOnInit() {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      this.userValue.set(savedUser);
    }

    const savedLogin = localStorage.getItem('loginSuccess');
    if (savedLogin !== null) {
      this.loginSuccess.set(JSON.parse(savedLogin));
    }
  }

  updateUsernameValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userValue.set(input.value);
  }

  updatePasswordValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.passwordValue.set(input.value);
  }

  updateMovieName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.movieName.set(input.value);
  }

  async authAdmin() {
    if (!this.userValue() || !this.passwordValue()) {
      console.log('invalid');
      this.loginSuccess.set(false);
      return;
    }

    try {
      this.loginSuccess.set(null);

      const response = await fetch(
        `api/adminlogin?user=${encodeURIComponent(this.userValue())}&pswrd=${encodeURIComponent(this.passwordValue())}`
      );

      if (!response.ok) {
        this.loginSuccess.set(false);
        throw new Error("Failed to authenticate user");
      }

      const data = await response.json();
      this.loginSuccess.set(data);

      return data;

    } catch (error) {
      console.error("Error reaching server to authenticate:", error);
      this.loginSuccess.set(false);
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

  logout() {
    this.userValue.set('');
    this.passwordValue.set('');
    this.loginSuccess.set(null);

    localStorage.removeItem('username');
    localStorage.removeItem('loginSuccess');
  }
}