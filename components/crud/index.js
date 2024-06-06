import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.15.133:5000'; 

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`);
      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const adicionarUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();
      console.log(data.message);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Email: {item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Button title="Adicionar Usuário" onPress={adicionarUsuario} />
      </View>

      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.email}
        style={styles.flatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  flatlist: {
    flex: 1,
  },
});

export default UsuariosCRUD;
