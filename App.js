// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/inicio/index.js'; 
import Login from './screens/login/index.js';
import Cadastro from './screens/cadastro/index.js';
import Report from './screens/report/index.js';
import Principal from './screens/principal/index.js';
import Maps from './screens/maps/index.js';
import UsuariosCrud from './screens/crudUsuario/index.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Report" component={Report}/>
        <Stack.Screen name="Principal" component={Principal}/>
        <Stack.Screen name="Maps" component={Maps}/>
        <Stack.Screen name="UsuariosCrud" component={UsuariosCrud}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

