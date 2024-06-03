import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import React, { useState } from 'react';


const Cadastro = () => {
  const [cpf, setCpf] = useState('');
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
          email: email, // Adicionando o campo de email
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Registro bem-sucedido, exiba uma mensagem ou navegue para outra tela
        Alert.alert('Sucesso', 'Usuário registrado com sucesso.');
      } else {
        // Exiba uma mensagem de erro se o registro falhar
        Alert.alert('Erro', data.message || 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar o registro.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Senha"
        onChangeText={(text) => setSenha(text)}
        value={senha}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
        keyboardType="email-address"
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Cadastro;
