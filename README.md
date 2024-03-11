# Aplicação

É uma aplicação de cardápio digital para um restaurante fictício.
Pode ser acessado aqui: https://foodgaia.netlify.app/

# Pages

Login
Cadastro
Home
Detalhes do prato
Novo prato (admin only)
Editar prato (admin only)

# Funcionalidades

Login
Cadastro
Cadastrar pratos (admin only)
Mostrar detalhes do prato
Editar prato (admin only)
Excluir prato (admin only)
Logout

# Tecnologias

Bcrypt.js
CORS
Dotenv
Express.js
express-async-errors
JSON Web Token
Knex.js
Node.js
Multer
PM2
SQLite
SQLite3

# Acessando

$ git clone https://github.com/paulakoppe/back

$ cd back

$ npm install

$ npm run migrate

$ npm run dev

# Personas 

Admin ( pode gerenciar o cardápio, adicionando, editando e removendo pratos)

E-mail: main@admin.com
Senha: ADMIN1234


User ( pode visualizar o cardápio, filtrar pratos, ver detalhes de pratos específicos)

E-mail: user@email.com
Senha: user123


Crie um arquivo .env de acordo com o arquivo .env.example e preencha os campos AUTH_SECRET e PORT.

Preencha o campo PORT com o número da porta desejada para executar o servidor da aplicação
