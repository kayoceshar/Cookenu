![cokenuu3](https://user-images.githubusercontent.com/102332717/220787670-df6c58d1-c8a5-4b35-a5d6-536805a06ef4.png)

Render:
<br/>
Documentação:

  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## 🧩 Projeto Cookenu - BackEnd - Turma Barros🥄

Esse produto nada mais é do que uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas as funcionalidades mais comuns em redes sociais:

🥄 1. **Cadastro / Criar Pessoa Usuária**
    
   > O usuário só precisa informar: o e-mail, nome a sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres. 
    
🥄 2. **Login**
    
   > Basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar **um** **token.**
    
🥄 3. **Informações do próprio perfil**
    
   > A partir do token de autenticação fornecido no login, o usuário deve ser capaz de ver as suas informações salvas no banco (id, nome e email)
    
🥄 4. **Criar receitas**
    
   > O usuário poderá criar uma receita. A receita deve ter os seguintes atributos: título, descrição-modo de preparo- e data de criação
    
🥄 5. **Seguir usuário**
    
   > Um usuário poderá seguir outros usuários. Para isso, ele deve fornecer o id do usuário que deseja seguir. Atente-se que essa funcionalidade se assemelha ao do instagram: um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro.
    
🥄 6. **Feed**
    
   > Um usuário poderá visualizar as receitas criadas pelos usuários que ele segue. As receitas devem estar ordenadas pela data de criação.
   
  
⚠️ **Importante:** 
   - Todos os endpoints, com exceção do Signup e Login, devem exigir autenticação.
   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
   
  ## 🎯 EndPoints 🥄
  
  - ### **🎯Signup**
    
    **Método:** POST
	  <br>
    **Path:** `/signup`
    
    **Entradas:**
    <br>
     Body
    ```json
    {
    	"name": "Alice",
    	"email": "alice@lbn.com",
    	"password": "123456"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"access_token": "token de acesso"
    }
    ```
    
    🔎 **Observações**:
    
    - O programa deve validar se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos
    - O código deve gerar o id do usuário
  
    [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
  - ### **🎯Login**
    
    **Método:** POST
    <br>
    **Path:** `/login`
    
    **Entradas:**
    <br>
     Body
    
    ```json
    {
    	"email": "alice@lbn.com",
    	"password": "123456"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"access_token": "token de acesso"
    }
    ```
    
    **🔎 Observações**:
    
    - O código deve validar se os dois campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos

    [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

- ### **🎯Pegar próprio perfil**
    
    **Método:** GET
    <br>
    **Path:** `/user/profile`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body
   
   ```json
      {
	    "id": "id do usuário",
	    "name": "Alice",
	    "email": "alice@lbn.com"
      }
    ```
   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
    - ### **🎯 Pegar perfil de outro usuário**
    
    **Método:** GET
    <br>
    **Path:** `/user/:id`
    
    **Entradas:**
    <br>
    Path Param
    
    ```
    id: "id do usuário"
    ```
    
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body

     ```json

      {
	    "id": "id do usuário",
	    "name": "Alice",
	    "email": "alice@lbn.com"
      }
    ```
  

   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)


   - ### **🎯Criar receita**
    
    **Método:** POST
      <br>
    **Path:** `/recipe`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    Body
    
    ```json
    {
    	"title": "título da receita",
    	"description": "descrição da receita"
    }
    ```
    
    **🔎 Observações**:
    
    - Perceba que, no banco de dados, deverá ser guardadado a data de criação da receita, mas o usuário não envia. O programa deve assumir que a receita foi criada no momento em que o usuário bate nessa requisição

  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

    - ### **🎯 Pegar receita**
    
    **Método:** GET
    <br>
    **Path:** `/recipe/:id`
    
    **Entradas:**
    
    Path Param
    
    ```
    id: "id da receita"
    ```
    
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"id": "id da receita",
    	"title": "Ovo Frito",
    	"description": "Pega o ovo, põe na frigideira e reza!"
    	"cratedAt": "31/12/2020"
    }
    ```

     [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

  - ## **🎖️ Informações Complementares**

  > Abaixo segue uma lista de implementaçõpes para dar mais funcionalidade ao projeto
    
    <br/>

  - ### **🎖️Seguir usuário**
    
    **Método:** POST
    <br>
    **Path:** `/user/follow`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    Body
    
    ```json
    {
    	"userToFollowId": "id do usuário que se deseja seguir"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"message": "Followed successfully"
    }
    ```
    
    **🔎 Observações**:
    
    > Você deve verificar se o id do usuário é válido (se não está vazio ou se não foi enviado)


      [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

  - ### **🎖️Deixar de Seguir usuário**
    <br>

    **Método:** POST
    <br>
    **Path:** `/user/unfollow`
    
    **Entradas:**
    
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    Body
    
    ```json
    {
    	"userToUnfollowId": "id do usuário que se deseja deixar de seguir"
    }
    ```
    
    **Saídas**
    <br>
    Body
    ```json
    {
    	"message": "Unfollowed successfully"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"message": "Unfollowed successfully"
    }
    ```
    
  **🔎Observações**:

  > O programa deve verificar se o id do usuário é válido (se não está vazio ou se não foi enviado)

     [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

   - ### **🎖️Pegar Feed de Receitas**
      <br>
    
    Este endpoint deve trazer todas as receitas criadas por pessoas que a pessoa logada (o id que está no token) segue.
    
    **Método:** GET
    <br>
    **Path:** `/user/feed`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body

    ```json
      {
	    "recipes": [{
			"id": "id da receita",
			"title": "título da receita",
			"description": "descrição da receita",
			"createdAt": "31/12/2020",
			"userId": "id do usuário que criou a receita",
			"userName": "nome do usuário que criou a receita"
	      }]
      }
  
    ```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

- ### **⭐Informações adicionais**

  - **Editar receita**
    > Um usuário "normal" deve ser capaz de editar uma receita própria dele.
    
    > O programa deve retornar um erro se a receita não for dele

    <br> 

  - **Deletar receita**
    > Um usuário "normal" deve ser capaz de deletar uma receita própria dele.
    
    > O programa deve retornar um erro se a receita não for dele
    
    > Agora, se o usuário que tentar acessar essa receita for um admin, o programa deve permitir que ele delete qualquer post que ele passar.

    <br>

  - **Deletar conta**
    > Um usuário "admin" deve ser capaz de deletar a conta de qualquer usuário.
    
    > O programa deve retornar um erro se o usuário que acessou essa funcionalidade não for um admin.
    
    > Quando for deletar o usuário, lembre-se que programa deve deletar todas as relações do MySQL com a qual ele esteja envolvido: receita e usuários que segue
  
    <br>

  - **Esqueci a senha**
    > O programa possui a funcionalidade de recuperação de senha enviando um e-mail para alteração de senha do usuário.
    
    [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
    
    - ### **👨‍💻 Tecnologias Utilizadas**
    	
	- Typescript
	- Node.js
	- MySQL
	- Express.js
	- Knex.js
	
	- Para Rodar o projeto foi utilizado a biblioteca NPM install.
    
