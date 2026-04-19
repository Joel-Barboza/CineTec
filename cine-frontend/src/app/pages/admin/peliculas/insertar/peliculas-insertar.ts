import { Component, signal, computed } from '@angular/core';

interface Protagonista {
  nombre: string;
  apellido: string;
}

interface Movie {
  nombreOriginal: string;
  nombreComercial: string;
  imageUrl: string;
  duracion: number;
  protagonistas: Protagonista[];
  director: string;
  clasificacion: string;
}

@Component({
  selector: 'app-peliculas-insertar',
  standalone: true,
  templateUrl: './peliculas-insertar.html',
})
export class PeliculasInsertar {


  nombreOriginal = signal("");
  nombreComercial = signal("");
  imageUrl = signal("");
  duracion = signal<number | null>(null);
  director = signal("");
  clasificacion = signal("");
  submitted = signal(false);

  protagonistas = signal<Protagonista[]>([]);

  nuevoNombre = signal("");
  nuevoApellido = signal("");

  updateSignal(event: Event, setter: (value: any) => void) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    setter(target.value);
  }



  isFormValid = computed(() => {
    return (
      this.nombreOriginal().trim() !== "" &&
      this.nombreComercial().trim() !== "" &&
      this.imageUrl().trim() !== "" &&
      this.duracion() !== null &&
      this.duracion()! > 0 &&
      this.director().trim() !== "" &&
      this.clasificacion().trim() !== "" &&
      this.protagonistas().length > 0
    );
  });

  addProtagonista() {
    if (!this.nuevoNombre() || !this.nuevoApellido()) return;

    this.protagonistas.update(list => [
      ...list,
      {
        nombre: this.nuevoNombre(),
        apellido: this.nuevoApellido()
      }
    ]);

    this.nuevoNombre.set("");
    this.nuevoApellido.set("");
  }

  removeProtagonista(index: number) {
    this.protagonistas.update(list => list.filter((_, i) => i !== index));
  }

  async sendMovie() {

    this.submitted.set(true);

    if (!this.isFormValid()) return;

    try {
      const response = await fetch("/api/Movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(this.nombreOriginal())
      });

      if (!response.ok) throw new Error("Error del servidor");

      await response.json();
      alert("Enviado");
      this.resetValues();
      return;

    } catch (error) {
      console.error("Error:", error);
    }
  }

  resetValues() {
    this.nombreOriginal.set("");
    this.nombreComercial.set("");
    this.imageUrl.set("");
    this.duracion.set(null);
    this.director.set("");
    this.clasificacion.set("");
    this.submitted.set(false);

    this.protagonistas.set([]);
  }

}
