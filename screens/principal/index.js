import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

const imagens = [
  require('../../assets/bg.jpeg')
];

const Principal = ({ navigation }) => {
  return (
    <ImageBackground source={imagens[0]} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
            <Text style={styles.buttonText}>Reportar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Maps')}>
            <Text style={styles.buttonText}>Mapa de Navegação</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 139, 0.6)', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#ADD8E6',
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
