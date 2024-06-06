import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

const ReportMapa = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleGeocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDfT8L0NCFL01uMG47yx9kBWsBgWxuWU5E`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
        setError(null);
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        setError('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
      setError('Erro ao geocodificar endereço. Tente novamente.');
    }
  };

  const handleReportLocation = async () => {
    if (location) {
      try {
        const response = await fetch('http://192.168.15.133:5000/reportar_localizacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location),
        });
        if (!response.ok) {
          throw new Error('Erro ao enviar localização para o servidor.');
        }
        const data = await response.json();
        console.log(data);
        Alert.alert('Sucesso', 'Localização reportada com sucesso!');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível reportar a localização. Tente novamente.');
      }
    } else {
      Alert.alert('Erro', 'Localização não disponível.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} // Alterado para PROVIDER_DEFAULT
        style={styles.map}
        initialRegion={region}
        region={region} 
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço"
        value={address}
        onChangeText={setAddress}
      />
  
      <TouchableOpacity style={styles.button} onPress={handleGeocodeAddress}>
        <Text style={styles.buttonText}>Buscar Localização</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReportLocation}>
        <Text style={styles.buttonText}>Reportar Localização</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ADD8E6', // Azul bebê
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ReportMapa;
