import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SucursalScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sucursales screen</Text>
      <View style={styles.footer}>
        <Button

          title="Regresar a inicio"
          onPress={() => navigation.navigate('HomeScreen')}
        />

        <Button
          title="Ir a Pelicula"
          onPress={() => navigation.navigate('MovieScreen')}
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

export default SucursalScreen;
