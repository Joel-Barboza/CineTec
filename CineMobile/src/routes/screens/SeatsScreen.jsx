import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { coerceDisplayMode } from 'react-native/types_generated/Libraries/ReactNative/DisplayMode';

const SeatsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Seats screen</Text>
      <View style={styles.footer}>
        <Button
          title="Regresar a "
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

export default SeatsScreen;
