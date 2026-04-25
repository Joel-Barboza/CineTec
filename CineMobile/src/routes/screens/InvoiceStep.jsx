import React from "react";
import { Text, View } from "react-native";

const InvoiceStep = ({
  selectedCinema,
  selectedMovie,
  selectedProj,
  selectedSeats,
  TICKET_PRICE,
  styles,
}) => {

  return (
    <>
      <Text style={styles.header}>Factura</Text>

      <View style={styles.invoice}>
        <Text style={styles.invoiceTitle}>CineTEC</Text>

        <View style={styles.rowBetween}>
          <Text>Cine:</Text>
          <Text>{selectedCinema}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Película:</Text>
          <Text>{selectedMovie?.CommercialName}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Proyección:</Text>
          <Text>
            {selectedProj?.time} - {selectedProj?.sala}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Asientos:</Text>
          <Text>{selectedSeats.join(", ")}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Cantidad:</Text>
          <Text>{selectedSeats.length}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text>Precio unitario:</Text>
          <Text>₡{TICKET_PRICE}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>Subtotal:</Text>
          <Text>₡{selectedSeats.length * TICKET_PRICE}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text>IVA (13%):</Text>
          <Text>
            ₡{Math.round(selectedSeats.length * TICKET_PRICE * 0.13)}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text>Total:</Text>
          <Text>
            ₡
            {Math.round(selectedSeats.length * TICKET_PRICE * 1.13)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default InvoiceStep;