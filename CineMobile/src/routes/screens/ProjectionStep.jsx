import React from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";

const ProjectionStep = ({
  projections,
  selectedProj,
  setSelectedProj,
  selectedMovie,
  styles,
}) => {

  const renderProjection = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cardRow,
        selectedProj === item && styles.selected,
      ]}
      onPress={() => setSelectedProj(item)}
    >
      <View>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.meta}>{item.sala}</Text>
      </View>
      <Text style={styles.avail}>{item.avail} disponibles</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.header}>
        {selectedMovie?.CommercialName}
      </Text>

      <FlatList
        data={projections}
        renderItem={renderProjection}
        keyExtractor={(item) => item.time}
      />
    </>
  );
};


export default ProjectionStep