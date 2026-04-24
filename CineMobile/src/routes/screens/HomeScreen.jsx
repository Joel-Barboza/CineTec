import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button
        title="Ir a Sucursales"
        onPress={() => navigation.navigate('SucursalScreen')}
      />
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
  }

});

export default HomeScreen;
