import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const imagens =[
    require('../../assets/oceano.jpg')
];

const Inicio = () =>{
  const navigation = useNavigation();

  return(
    <ImageBackground source={imagens[0]} style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button
            title="Ir para Login"
            onPress={() => navigation.navigate('Login')}
            />
        </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    buttonContainer: {
      marginBottom: 30,
      marginHorizontal: 20,
    },
  });
  export default Inicio;