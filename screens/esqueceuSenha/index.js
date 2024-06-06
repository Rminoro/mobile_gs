import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal, Button, ImageBackground } from 'react-native';
import axios from 'axios';

const EsqueceuSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleRecuperarSenha = async () => {
    try {
      const response = await axios.post('http://192.168.15.133:5000/recuperar_senha', {
        email: email,
      });
      console.log(response.data.message);

      setModalMessage('Senha recuperada com sucesso!');
      setModalSuccess(true);
      setModalVisible(true);
      setEmail(''); 

      navigation.navigate('RedefinirSenha');

    } catch (error) {
      console.error('Erro ao recuperar senha:', error.response.data.error);
      setModalMessage('Erro ao recuperar senha. Verifique seu email e tente novamente.');
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Recuperação de Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
            <Text style={styles.buttonText}>Recuperar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Voltar para Login</Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, modalSuccess ? styles.modalSuccess : styles.modalError]}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
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
      flex: 1,
      backgroundColor: 'rgba(0, 0, 255, 0.5)', 
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    titulo: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      color: '#333', 
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007bff',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 20,
      alignItems: 'center',
    },
    linkText: {
      color: '#ffffff', 
      textDecorationLine: 'underline',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
      color: '#333', 
    },
    modalSuccess: {
      backgroundColor: 'green',
    },
    modalError: {
      backgroundColor: 'red',
    },
  });
  
  export default EsqueceuSenha;