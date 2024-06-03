import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Principal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Reportar" onPress={() => navigation.navigate('Report')} />
      <Button title="Mapa de Navegação" onPress={() => navigation.navigate('Maps')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default Principal;
