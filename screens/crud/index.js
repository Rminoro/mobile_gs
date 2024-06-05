import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firebase from './firebase';

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const usuariosRef = firebase.database().ref('usuarios');
    usuariosRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usuariosList = Object.values(data);
        setUsuarios(usuariosList);
      } else {
        setUsuarios([]);
      }
    });

    return () => usuariosRef.off('value');
  }, []);

  const adicionarUsuario = () => {
    const usuariosRef = firebase.database().ref('usuarios');
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    usuariosRef.push(usuario);
    setNome('');
    setEmail('');
    setSenha('');
  };

  const excluirUsuario = (usuarioId) => {
    const usuarioRef = firebase.database().ref('usuarios').child(usuarioId);
    usuarioRef.remove();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Text>{item.email}</Text>
      <Button title="Excluir" onPress={() => excluirUsuario(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
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
        keyExtractor={(item) => item.id}
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
