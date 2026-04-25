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
          <Text style={styles.textWhite}>Cine:</Text>
          <Text style={styles.textWhite}>{selectedCinema}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Película:</Text>
          <Text style={styles.textWhite}>{selectedMovie?.CommercialName}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Proyección:</Text>
          <Text style={styles.textWhite}>
            {selectedProj?.time} - {selectedProj?.sala}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Asientos:</Text>
          <Text style={styles.textWhite}>{selectedSeats.join(", ")}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Cantidad:</Text>
          <Text style={styles.textWhite}>{selectedSeats.length}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Precio unitario:</Text>
          <Text style={styles.textWhite}>₡{TICKET_PRICE}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>Subtotal:</Text>
          <Text style={styles.textWhite}>₡{selectedSeats.length * TICKET_PRICE}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.textWhite}>IVA (13%):</Text>
          <Text style={styles.textWhite}>
            ₡{Math.round(selectedSeats.length * TICKET_PRICE * 0.13)}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>
            ₡{Math.round(selectedSeats.length * TICKET_PRICE * 1.13)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default InvoiceStep;