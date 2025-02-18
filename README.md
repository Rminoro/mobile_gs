<h1  align="center">Projeto Blue Clean :ocean:</h1>

<div align="center">
<h2>Descrição do Projeto</h2>
<p>
O Projeto Blue Clean visa combater a poluição nos mares e cidades, permitindo que os usuários reportem pontos de lixo em diferentes locais. Através de um sistema de localização, os usuários podem inserir informações sobre o local exato onde o lixo foi encontrado. Essas informações são salvas em um banco de dados para facilitar o monitoramento e a limpeza das áreas afetadas.

Além disso, o projeto possui uma funcionalidade de "Waze" para mostrar o caminho até a localização de lixo para os coletores, otimizando o tempo e garantindo uma coleta eficiente.

O sistema também inclui recursos de cadastro de usuários, login, e recuperação de senha via token para uma melhor experiência do usuário e segurança.
</p>
</div>

<div>
  <h2>Funcionalidades</h2>
  <ul>
    <li>Cadastro de Usuários: Permite que os usuários se cadastrem no sistema.</li>
    <li>Login de Usuários: Autenticação de usuários para acessar o sistema.</li>
    <li>Recuperação de Senha via Token: Envia um token para o e-mail do usuário para redefinir a senha de forma segura.
    </li>
    <li>Localização de Lixo: Usuários podem reportar o local exato de lixo encontrado e o sistema registra a localização.
    </li>
    <li>Roteamento para Coletores: Coletores podem ver o caminho até o ponto de lixo usando um sistema de navegação (semelhante ao Waze)
    </li>
  </ul>
</div>

<div>
  <h2>Tecnlogias utilizadas</h2>
    <img align="center" alt="Rafa-Python" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/python-original.svg">
    <img align="center" alt="Rafa-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
</div>

<h3 align="center">Endpoints :iphone:</h3>

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
