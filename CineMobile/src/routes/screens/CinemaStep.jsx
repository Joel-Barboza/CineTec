import React from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";

const CinemaStep = ({ cinemas, selectedCinema, setSelectedCinema, styles }) => {
  const renderCinema = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cardRow,
        selectedCinema === item.name && styles.selected,
      ]}
      onPress={() => setSelectedCinema(item.name)}
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>{item.loc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Seleccionar cine</Text>
      <FlatList
        data={cinemas}
        renderItem={renderCinema}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};


export default CinemaStep