import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import movies from "../data/movies";
import { cinemas } from "../data/cinemas";
import { projections } from "../data/projections";

import CinemaStep from "./CinemaStep";
import MovieStep from "./MovieStep";
import ProjectionStep from "./ProjectionStep";
import SeatStep from "./SeatStep";
import InvoiceStep from "./InvoiceStep";

const ROWS = ["A", "B", "C", "D", "E"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

const TICKET_PRICE = 3000;

const MainScreen = () => {
  const [step, setStep] = useState(0);

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedProj, setSelectedProj] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const canNext = () => {
    if (step === 0) return selectedCinema;
    if (step === 1) return selectedMovie;
    if (step === 2) return selectedProj;
    if (step === 3) return selectedSeats.length > 0;
    return false;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {step === 0 && (
          <CinemaStep
            cinemas={cinemas}
            selectedCinema={selectedCinema}
            setSelectedCinema={setSelectedCinema}
            styles={styles}
          />
        )}

        {step === 1 && (
          <MovieStep
            movies={movies}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            styles={styles}
          />
        )}

        {step === 2 && (
          <ProjectionStep
            projections={projections}
            selectedProj={selectedProj}
            setSelectedProj={setSelectedProj}
            selectedMovie={selectedMovie}
            styles={styles}
          />
        )}

        {step === 3 && (
          <SeatStep
            ROWS={ROWS}
            COLS={COLS}
            selectedSeats={selectedSeats}
            toggleSeat={toggleSeat}
            styles={styles}
          />
        )}

        {step === 4 && (
          <InvoiceStep
            selectedCinema={selectedCinema}
            selectedMovie={selectedMovie}
            selectedProj={selectedProj}
            selectedSeats={selectedSeats}
            TICKET_PRICE={TICKET_PRICE}
            styles={styles}
          />
        )}
      </View>

      <View style={styles.footer}>
        {step > 0 && (
          <TouchableOpacity 
            style={styles.mainBtn} 
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.btnText}>Atrás</Text>
          </TouchableOpacity>
        )}

        {step < 4 && (
          <TouchableOpacity
            style={[
              styles.mainBtn,
              !canNext() && styles.disabled,
            ]}
            disabled={!canNext()}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.btnText}>
              {step === 3 ? "Ver factura" : "Siguiente"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  header: { fontSize: 18, fontWeight: "600", marginBottom: 15 },

  // Cartelera Nueva (Póster pegado)
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden", 
    alignItems: "center",
  },
  posterBox: {
    width: 80,
    height: 100,
    backgroundColor: "#2c2c54",
    justifyContent: "center",
    alignItems: "center",
  },
  movieInfo: { flex: 1, padding: 12 },

  // Cine y Proyecciones (Original)
  cardRow: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  selected: { borderColor: "#dc3545", borderWidth: 2 },
  title: { fontWeight: "600" },
  meta: { fontSize: 12, color: "#6c757d", marginTop: 2 },
  posterText: { color: "#fff", fontWeight: "bold" },
  badge: { marginTop: 4, color: "#dc3545", fontSize: 11, fontWeight: "600" },

  // Horas y Disponibilidad (Original)
  time: { fontSize: 18, fontWeight: "600" },
  avail: { color: "green" }, 

  // Asientos y PANTALLA (Restaurado)
  screen: {
    height: 8,
    backgroundColor: "#ddd",
    width: "80%",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 5 },
  seat: {
    width: 30,
    height: 30,
    margin: 3,
    borderRadius: 4,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  seatSelected: { backgroundColor: "#dc3545" },
  seatText: { fontSize: 10 },

  // Botones (Nueva Versión Simétrica)
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
  },
  mainBtn: {
    flex: 0.48,
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  disabled: { opacity: 0.4 },

  // Factura
  invoice: { backgroundColor: "#fff", padding: 16, borderRadius: 10, borderWidth: 1, borderColor: "#dee2e6" },
  invoiceTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  divider: { borderTopWidth: 1, borderColor: "#dee2e6", marginVertical: 10 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});

export default MainScreen;

