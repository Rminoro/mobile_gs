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
// import React, { useState } from 'react';
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// const ReportMapa = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const [address, setAddress] = useState('');

//   const handleGeocodeAddress = async () => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDfT8L0NCFL01uMG47yx9kBWsBgWxuWU5E`
//       );
//       const data = await response.json();

//       if (data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry.location;
//         setLocation({ latitude: lat, longitude: lng });
//         setError(null);
//       } else {
//         setError('Endereço não encontrado.');
//       }
//     } catch (error) {
//       console.error('Erro ao geocodificar endereço:', error);
//       setError('Erro ao geocodificar endereço. Tente novamente.');
//     }
//   };

//   const handleReportLocation = async () => {
//     if (location) {
//       try {
//         const response = await fetch('http://192.168.15.133:5000/reportar_localizacao', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(location),
//         });
//         if (!response.ok) {
//           throw new Error('Erro ao enviar localização para o servidor.');
//         }
//         const data = await response.json();
//         console.log(data);
//         Alert.alert('Sucesso', 'Localização reportada com sucesso!');
//       } catch (error) {
//         console.error(error);
//         Alert.alert('Erro', 'Não foi possível reportar a localização. Tente novamente.');
//       }
//     } else {
//       Alert.alert('Erro', 'Localização não disponível.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: -23.55052,
//           longitude: -46.633308,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}
//       >
//         {location && <Marker coordinate={location} />}
//       </MapView>
//       <TextInput
//         style={styles.input}
//         placeholder="Digite o endereço"
//         value={address}
//         onChangeText={setAddress}
//       />
  
//       <Button title="Buscar Localização" onPress={handleGeocodeAddress} />
//       <Button title="Reportar Localização" onPress={handleReportLocation} />
//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: '100%',
//     height: 300,
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default ReportMapa;
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
        provider={PROVIDER_GOOGLE}
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
  
      <Button title="Buscar Localização" onPress={handleGeocodeAddress} />
      <Button title="Reportar Localização" onPress={handleReportLocation} />
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
    width: '100%',
    height: 300,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ReportMapa;
