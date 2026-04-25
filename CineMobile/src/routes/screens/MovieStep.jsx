import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const MovieStep = ({ movies, selectedMovie, setSelectedMovie, styles }) => {
  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedMovie === item && styles.selected,
      ]}
      onPress={() => setSelectedMovie(item)}
    >
      <View style={styles.posterBox}>
        <Text style={styles.posterText}>
          {item.CommercialName.slice(0, 2).toUpperCase()}
        </Text>
      </View>

      <View style={styles.movieInfo}>
        <Text style={styles.title}>{item.CommercialName}</Text>
        <Text style={styles.meta}>
          {item.Duration} min · {item.Director}
        </Text>
        <Text style={styles.badge}>{item.Rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.header}>Cartelera</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(_, i) => i.toString()}
      />
    </>
  );
};

export default MovieStep;