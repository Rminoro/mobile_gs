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

|Método|Endpoint                           |Descrição           |
|------|-----------------------------------|--------------------|
|POST  |http://192.168.15.133:5000/usuarios|Cadastrar um usuário|
|PUT   |/alertas/id|Alterar uma detecção     |
|DELETE|/alertas/id|Deletar uma detecção     |
