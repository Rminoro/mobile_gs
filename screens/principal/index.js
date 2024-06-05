import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Principal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
        <Text style={styles.buttonText}>Reportar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Maps')}>
        <Text style={styles.buttonText}>Mapa de Navegação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10, 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Principal;
