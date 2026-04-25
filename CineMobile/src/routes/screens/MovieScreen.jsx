import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovieScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Movie screen</Text>
      <View style={styles.footer}>
        <Button
          title="Regresar a sucursal"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <Button
          title="Ir a Proyeccion"
          onPress={() => navigation.navigate('ProjectionScreen')}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070709',
  },

  text: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#292931'
  }

});

export default MovieScreen;
