import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';

const Maps = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  const handleGeocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAMPutJS_Grg1rpO5XbSv3qs0-smP5rHYc`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        Alert.alert('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
    return null;
  };

  const updateRouteCoordinates = (encoded) => {
    const decoded = polyline.decode(encoded);
    const routeCoords = decoded.map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }));
    setRouteCoordinates(routeCoords);
  };

  const handleCalculateRoute = async () => {
    console.log('Origin Input:', originInput);
    console.log('Destination Input:', destinationInput);

    if (originInput && destinationInput) {
      const originCoords = await handleGeocodeAddress(originInput);
      const destinationCoords = await handleGeocodeAddress(destinationInput);

      console.log('Origin Coords:', originCoords);
      console.log('Destination Coords:', destinationCoords);

      if (originCoords && destinationCoords) {
        setOrigin(originCoords);
        setDestination(destinationCoords);

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&key=AIzaSyDfT8L0NCFL01uMG47yx9kBWsBgWxuWU5E`
          );
          const data = await response.json();

          console.log('Direction Data:', data);

          if (data.routes.length > 0) {
            const points = data.routes[0].overview_polyline.points;
            updateRouteCoordinates(points);
            const newRegion = {
              latitude: originCoords.latitude,
              longitude: originCoords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
            mapRef.current.animateToRegion(newRegion);
            // aqui ele deixa o fundo com a cor normal dps de pesquisar
            setIsOverlayVisible(false);
          }
        } catch (error) {
          console.error('Error calculating route:', error);
        }
      }
    } else {
      Alert.alert('Por favor, insira ambos os endereços');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin ? origin.latitude : 0,
          longitude: origin ? origin.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && destination && (
          <>
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
            <Marker coordinate={origin} pinColor="green" />
            <Marker coordinate={destination} pinColor="red" />
          </>
        )}
      </MapView>
      {isOverlayVisible && <View style={styles.overlay} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Origem"
          placeholderTextColor="#fff"
          value={originInput}
          onChangeText={setOriginInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          placeholderTextColor="#fff"
          value={destinationInput}
          onChangeText={setDestinationInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleCalculateRoute}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 139, 0.6)', 
  },
  inputContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 139, 0.6)',
    padding: 10,
    borderRadius: 5,
    elevation: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#fff',
    color: '#fff', 
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Maps;
//atualizado* quando faz a pesquisa, o fundo volta a ter a cor normal e nao fica azul em cima 