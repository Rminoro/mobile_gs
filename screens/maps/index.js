import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const MapWithRoute = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      // Obtenha a localização atual como origem
      let { coords } = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      // Define um destino de exemplo (pode ser alterado para coordenadas diferentes)
      setDestination({
        latitude: 37.771707,
        longitude: -122.4053769,
      });
    })();
  }, []);

  const handleCalculateRoute = async () => {
    if (origin && destination) {
      try {
        // Consulta a API de rotas (exemplo com o Google Maps Directions API)
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
        );
        const data = await response.json();

        if (data.routes.length > 0) {
          const points = data.routes[0].overview_polyline.points;
          const routeCoords = decodePolyline(points);
          setRouteCoordinates(routeCoords);
        }
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    }
  };

  const decodePolyline = (encoded) => {
    const polyline = require('@mapbox/polyline');
    return polyline.decode(encoded).map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
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
      <Button title="Calcular Rota" onPress={handleCalculateRoute} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapWithRoute;
