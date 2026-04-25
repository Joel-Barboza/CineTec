import React from "react";
import { Text, FlatList, TouchableOpacity } from "react-native";

const CinemaStep = ({ cinemas, selectedCinema, setSelectedCinema, styles }) => {

  const renderCinema = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedCinema === item.name && styles.selected,
      ]}
      onPress={() => setSelectedCinema(item.name)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.meta}>{item.loc}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.header}>Seleccionar cine</Text>
      <FlatList
        data={cinemas}
        renderItem={renderCinema}
        keyExtractor={(item) => item.name}
      />
    </>
  );
};

export default CinemaStep;