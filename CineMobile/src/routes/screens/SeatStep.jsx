import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const SeatStep = ({
  ROWS,
  COLS,
  selectedSeats,
  toggleSeat,
  styles,
}) => {

  return (
    <>
      <Text style={styles.header}>Seleccionar asientos</Text>

      {ROWS.map((row) => (
        <View key={row} style={styles.row}>
          {COLS.map((col) => {
            const seat = row + col;
            const selected = selectedSeats.includes(seat);

            return (
              <TouchableOpacity
                key={seat}
                style={[
                  styles.seat,
                  selected && styles.seatSelected,
                ]}
                onPress={() => toggleSeat(seat)}
              >
                <Text style={styles.seatText}>{col}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </>
  );
};

export default SeatStep;