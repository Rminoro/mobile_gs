// UsuariosScreen.js
import React from 'react';
import { View } from 'react-native';
import UsuariosCRUD from '../../components/crud/index.js'; 

const UsuariosCrud = () => {
  return (
    <View style={{ flex: 1 }}>
      <UsuariosCRUD />
    </View>
  );
};

export default UsuariosCrud;

// PARA ACESSAR O CRUD NO APP, UTILIZAR O LOGIN admin@admin.com senha abcd12345
