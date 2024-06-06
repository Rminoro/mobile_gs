import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ImageBackground, Button, Text, TouchableOpacity } from 'react-native';

const imagens = [
    require('../../assets/bg.jpeg')
];

const Inicio = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={imagens[0]} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BlueClean</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Ir para Login</Text>
        </TouchableOpacity>
       
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#4169e1',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#add8e6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
