<h1  align="center">Projeto Blue Clean :ocean:</h1>

<div align="center">
<h3>Integrantes do grupo :mortar_board:</h3>
  <li>Henrique Oliveira - RM97796 (2TDSPG)</li>
  <li>Kaique Oliveira - RM550815 (2TDSS)</li>
  <li>Rafael Minoro - RM99988 (2TDSS)</li>
  <li>Thiago Gil - RM551211 (2TDSPV)</li>
  <li>Vitor Pereira - RM551831 (2TDSS)</li>
</div>

<h1 align="center">Endpoints :iphone:</h1>

<li>Cadastro</li>

|Método|Endpoint                           |Descrição           |
|------|-----------------------------------|--------------------|
|POST  |http://192.168.15.133:5000/register|Cadastrar um usuário|

<li>Esqueceu senha</li>

|Método|Endpoint                                   |Descrição                             |
|------|-------------------------------------------|--------------------------------------|
|POST  |/http://192.168.15.133:5000/recuperar_senha|Enviar um token de recuperação de senha para e-amil cadastrado|


<li>Maps</li>

|Método|Endpoint                                                                                                                                                                                                                              |Descrição                 |                                                                                                                                                                                                         
|------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|                                                                                                                                                                                                           
|POST  |/`https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&key=AIzaSyDfT8L0NCFL01uMG47yx9kBWsBgWxuWU5E`|Listar um endereço buscado|


<li>Redefinir senha</li>

|Método|Endpoint                                  |Descrição                                             |
|------|------------------------------------------|------------------------------------------------------|
|POST  |http://192.168.15.133:5000/redefinir_senha|Inserir o token de validação para criar uma nova senha|

<li>Usuário</li>

|Método|Endpoint                                 |Descrição           |
|------|-----------------------------------------|--------------------|
|POST  |http://192.168.15.133:5000/usuarios      |Cadastrar um usuário|
|PUT   |http://192.168.15.133:5000/usuarios/email|Alterar a senha     |
|DELETE|http://192.168.15.133:5000/usuarios/email|Deletar um usuário  |

<h3 align="center">Exemplos de requisições 🌐</h3>

<li>Post de usuário</li>

   const adicionarUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();
      Alert.alert(data.message);
      setShowUsuarios(true); // Mostrar a lista de usuários após adicionar
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

<li>Put de usuário</li>

const alterarSenha = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novaSenha }),
      });
      const data = await response.json();
      Alert.alert(data.message);
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    }
  };

<li>Delete de usuário</li>

const deletarUsuario = async (userEmail) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${userEmail}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      Alert.alert(data.message);
      setShowUsuarios(true); // Atualizar a lista de usuários após deletar
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
