import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { Router} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFilm, faTicket, faUserTie, faVideo } from '@fortawesome/free-solid-svg-icons';

interface Movie {
  originalName: string;
  commercialName: string;
  imageUrl: string;
  duration: number;
  mainActors: string[];
  director: string;
  rating: string;
}

@Component({
  selector: 'app-cliente-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cliente-page.html',
  styleUrl: './cliente-page.css'
})
export class ClientePage {

  // STATE
  step = signal(0);

  selectedCinema = signal<string | null>(null);
  selectedMovie = signal<Movie | null>(null);
  selectedProj = signal<{ time: string; sala: string } | null>(null);
  selectedSeats = signal<string[]>([]);

  movies = signal<Movie[]>([]);
  loadingMovies = signal(false);
  onMovieListing = signal(false);

  facturaNum = signal('');
  facturaFecha = signal('');
  pdfSent = signal(false);

  ticketIcon = faTicket;
  filmIcon = faFilm;
  adminIcon = faUserTie;
  videoIcon = faVideo;
  checkIcon = faCheck;


  private router = inject(Router);

  readonly TICKET_PRICE = 4500;
  readonly IVA_RATE = 0.13;

  readonly cinemas = [
    { name: 'CineTEC Escazú', loc: 'Multiplaza Escazú, San José' },
    { name: 'CineTEC Cartago', loc: 'Plaza Rovicentro, Cartago' },
    { name: 'CineTEC Heredia', loc: 'Mall Paseo de las Flores, Heredia' },
  ];

  readonly projections = [
    { time: '14:00', sala: 'Sala 3 — Digital', avail: 32 },
    { time: '16:30', sala: 'Sala 1 — IMAX', avail: 18 },
    { time: '19:00', sala: 'Sala 2 — Digital', avail: 45 },
    { time: '21:30', sala: 'Sala 4 — 4DX', avail: 12 },
  ];

  readonly ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
  readonly COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  readonly occupied = ['A2', 'A5', 'B3', 'B7', 'C1', 'C4', 'D6', 'D9', 'E2', 'E8'];
  readonly restricted = ['A4', 'A6', 'C5', 'C6', 'D5'];

  // COMPUTED
  subtotal = computed(() => this.selectedSeats().length * this.TICKET_PRICE);
  iva = computed(() => Math.round(this.subtotal() * this.IVA_RATE));
  totalPrice = computed(() => this.subtotal() + this.iva());

  summaryText = computed(() => {
    const s = this.step();
    if (s === 0) return this.selectedCinema() ?? 'Seleccioná un cine';
    if (s === 1) return this.selectedMovie()?.commercialName ?? 'Seleccioná una película';
    if (s === 2) return this.selectedProj()?.time ?? 'Seleccioná una proyección';
    if (s === 3) return this.selectedSeats().length > 0
      ? `${this.selectedSeats().length} asiento(s) — ₡${this.totalPrice().toLocaleString('es-CR')}`
      : 'Seleccioná asientos';
    return '¡Reservación confirmada!';
  });

  // NAV
  canNext() {
    const s = this.step();
    if (s === 0) return !!this.selectedCinema();
    if (s === 1) return !!this.selectedMovie();
    if (s === 2) return !!this.selectedProj();
    if (s === 3) return this.selectedSeats().length > 0;
    return false;
  }

  next() {
    if (!this.canNext()) return;
    if (this.step() === 0) this.getAllMovies();
    if (this.step() === 3) this.buildFactura();
    this.step.update(s => s + 1);
  }

  back() { this.step.update(s => Math.max(0, s - 1)); }

  goToStep(n: number) {
    if (n < this.step()) this.step.set(n);
  }

  // DATA
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

  // ACTIONS
  selectCinema(name: string) { this.selectedCinema.set(name); }
  selectMovie(m: Movie) { this.selectedMovie.set(m); }
  selectProj(p: { time: string; sala: string }) { this.selectedProj.set(p); }

  toggleSeat(id: string) {
    if (this.occupied.includes(id) || this.restricted.includes(id)) return;
    this.selectedSeats.update(seats =>
      seats.includes(id) ? seats.filter(s => s !== id) : [...seats, id]
    );
  }

  seatState(id: string): string {
    if (this.selectedSeats().includes(id)) return 'selected';
    if (this.occupied.includes(id)) return 'occupied';
    if (this.restricted.includes(id)) return 'restricted';
    return '';
  }

  // FACTURA
  buildFactura() {
    this.facturaNum.set(String(Math.floor(Math.random() * 900000 + 100000)));
    this.facturaFecha.set(new Date().toLocaleString('es-CR'));
    this.pdfSent.set(false);
  }

  // PDF con jsPDF
  private crc(amount: number): string {
    return "CRC " + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  downloadPDF() {
    const doc = new jsPDF();
    const movie = this.selectedMovie()!;
    const proj = this.selectedProj()!;

    // --- Encabezado ---
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('CineTEC', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Comprobante de compra de entradas', 14, 27);
    doc.text(`Factura #${this.facturaNum()}`, 14, 33);
    doc.text(`Fecha: ${this.facturaFecha()}`, 14, 39);

    // Línea separadora
    doc.setDrawColor(220);
    doc.line(14, 44, 196, 44);

    // --- Detalle ---
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalle de la compra', 14, 52);

    const rows = [
      ['Cine', this.selectedCinema()!],
      ['Película', movie.commercialName],
      ['Director', movie.director],
      ['Clasificación', movie.rating],
      ['Proyección', `${proj.time} — ${proj.sala}`],
      ['Asientos', this.selectedSeats().join(', ')],
      ['Cantidad', String(this.selectedSeats().length)],
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let y = 60;
    for (const [label, value] of rows) {
      doc.setTextColor(100);
      doc.text(label, 14, y);
      doc.setTextColor(0);
      doc.text(value, 80, y);
      y += 8;
    }

    // Línea separadora
    doc.setDrawColor(220);
    doc.line(14, y + 2, 196, y + 2);
    y += 10;

    // --- Totales ---
    doc.setFontSize(10);
    const totales = [
      ['Precio unitario', this.crc(this.TICKET_PRICE)],
      ['Subtotal', this.crc(this.subtotal())],
      ['IVA (13%)', this.crc(this.iva())],
    ];

    for (const [label, value] of totales) {
      doc.setTextColor(100);
      doc.text(label, 130, y);
      doc.setTextColor(0);
      doc.text(value, 180, y, { align: 'right' });
      y += 8;
    }

    // Total final
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('Total', 130, y + 4);
    doc.text(this.crc(this.totalPrice()), 180, y + 4, { align: 'right' });

    doc.save(`factura-cinetec-${this.facturaNum()}.pdf`);
    this.pdfSent.set(true);
    setTimeout(() => {this.step.set(0)},2000)
  }

  posterInitials(name: string) {
    return name.substring(0, 2).toUpperCase();
  }

  tickets() {
    this.onMovieListing.set(false);
  }
  
  movieListing() {
    this.onMovieListing.set(true);
    this.getAllMovies();
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}