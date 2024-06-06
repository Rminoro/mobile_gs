import { View, TextInput, StyleSheet, Button, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';

const Cadastro = () => {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.15.133:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senha: senha,
          email: email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso.');
      } else {
        Alert.alert('Erro', data.message || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar o registro.');
    }
  };

  return (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <TextInput
          placeholder="Senha"
          onChangeText={(text) => setSenha(text)}
          value={senha}
          style={[styles.input, styles.inputText]}
          placeholderTextColor="#ffffff"
          secureTextEntry
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={[styles.input, styles.inputText]}
          placeholderTextColor="#ffffff"
          keyboardType="email-address"
        />
        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleRegister} color="#ffff" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 255, 0.5)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputText: {
    color: '#ffffff', 
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Cadastro;
