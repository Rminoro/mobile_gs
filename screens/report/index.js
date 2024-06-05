// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

// const reportMapa = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     Geolocation.requestAuthorization('whenInUse');
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//         setError(null); 
//       },
//       (error) => {
//         console.error(error);
//         setError('Não foi possível obter a localização. Verifique suas permissões e tente novamente.');
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   }, []);

//   const handleReportLocation = () => {
//     if (location) {
//       fetch('https://seu-backend.com/report-location', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(location),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Erro ao enviar localização para o servidor.');
//           }
//           return response.text();
//         })
//         .then((data) => {
//           console.log(data);
//           Alert.alert('Sucesso', 'Localização reportada com sucesso!');
//         })
//         .catch((error) => {
//           console.error(error);
//           Alert.alert('Erro', 'Não foi possível reportar a localização. Tente novamente.');
//         });
//     } else {
//       Alert.alert('Erro', 'Localização não disponível.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {location ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} />
//         </MapView>
//       ) : (
//         <Text>{error || 'Obtendo localização...'}</Text>
//       )}
//       <Button title="Reportar Localização" onPress={handleReportLocation} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default reportMapa;
// //https://www.youtube.com/watch?v=7DY1tHHudtM
// 
// import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const ReportMapa = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de acesso à localização foi negada.');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setError(null); // Limpa o erro se a localização for obtida com sucesso
    })();
  }, []);

  const handleReportLocation = () => {
    if (location) {
      fetch('http://192.168.15.133:5000//reportar_localizacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao enviar localização para o servidor.');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          Alert.alert('Sucesso', 'Localização reportada com sucesso!');
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Erro', 'Não foi possível reportar a localização. Tente novamente.');
        });
    } else {
      Alert.alert('Erro', 'Localização não disponível.');
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      ) : (
        <Text>{error || 'Obtendo localização...'}</Text>
      )}
      <Button title="Reportar Localização" onPress={handleReportLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ReportMapa;
