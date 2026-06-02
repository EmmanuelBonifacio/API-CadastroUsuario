# API de Cadastro de Usuários

API REST para cadastro e gerenciamento de usuários, construída com Node.js, TypeScript, Express e MongoDB.

## Tecnologias

- **Node.js** — ambiente de execução JavaScript no servidor
- **TypeScript** — tipagem estática para maior segurança e produtividade
- **Express 5** — framework web para criação das rotas e middlewares
- **MongoDB + Mongoose** — banco de dados NoSQL com modelagem de dados
- **bcryptjs** — criptografia de senhas
- **dotenv** — gerenciamento de variáveis de ambiente
- **Helmet** — proteção via headers HTTP de segurança
- **CORS** — controle de acesso entre origens
- **express-rate-limit** — proteção contra ataques de força bruta

## Requisitos

- Node.js 18+
- npm 9+
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuito) ou MongoDB local

## Instalação

```bash
# Clone o repositório
git clone https://github.com/EmmanuelBonifacio/API-CadastroUsuario.git

# Entre na pasta
cd API-CadastroUsuario

# Instale as dependências
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/cadastro-usuarios?retryWrites=true&w=majority
ALLOWED_ORIGIN=http://localhost:5173
```

| Variável | Descrição |
|---|---|
| `PORT` | Porta onde o servidor vai rodar (padrão: 3000) |
| `MONGODB_URI` | String de conexão com o MongoDB Atlas |
| `ALLOWED_ORIGIN` | Origem permitida pelo CORS (use `*` para qualquer origem) |

## Executando o projeto

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## Endpoints

Base URL: `http://localhost:3000`

### Verificar status da API

```http
GET /
```

Resposta:
```json
{
  "mensagem": "API de Cadastro de Usuários funcionando!"
}
```

---

### Cadastrar usuário

```http
POST /api/users
Content-Type: application/json
```

Body:
```json
{
  "nome": "Emmanuel Bonifacio",
  "email": "emmanuel@email.com",
  "senha": "123456"
}
```

Resposta `201 Created`:
```json
{
  "_id": "64abc123...",
  "nome": "Emmanuel Bonifacio",
  "email": "emmanuel@email.com",
  "criadoEm": "2025-06-02T10:00:00.000Z"
}
```

---

### Listar todos os usuários

```http
GET /api/users
```

Resposta `200 OK`:
```json
[
  {
    "_id": "64abc123...",
    "nome": "Emmanuel Bonifacio",
    "email": "emmanuel@email.com",
    "criadoEm": "2025-06-02T10:00:00.000Z"
  }
]
```

---

### Buscar usuário por ID

```http
GET /api/users/:id
```

Resposta `200 OK`:
```json
{
  "_id": "64abc123...",
  "nome": "Emmanuel Bonifacio",
  "email": "emmanuel@email.com",
  "criadoEm": "2025-06-02T10:00:00.000Z"
}
```

---

### Atualizar usuário

```http
PUT /api/users/:id
Content-Type: application/json
```

Body (todos os campos são opcionais):
```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "senha": "novaSenha123"
}
```

Resposta `200 OK`:
```json
{
  "_id": "64abc123...",
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "criadoEm": "2025-06-02T10:00:00.000Z"
}
```

---

### Deletar usuário

```http
DELETE /api/users/:id
```

Resposta `200 OK`:
```json
{
  "mensagem": "Usuário deletado com sucesso"
}
```

---

## Códigos de resposta

| Código | Descrição |
|---|---|
| `200` | Operação realizada com sucesso |
| `201` | Usuário criado com sucesso |
| `400` | Dados inválidos ou email já cadastrado |
| `404` | Usuário não encontrado |
| `429` | Muitas requisições — aguarde 15 minutos |
| `500` | Erro interno do servidor |

## Segurança

- Senhas criptografadas com **bcryptjs** (salt rounds: 10)
- Headers de segurança configurados com **Helmet**
- Rate limiting de **100 requisições por IP a cada 15 minutos**
- Senhas nunca retornadas nas respostas da API
- Validação de formato de email no cadastro
- Validação de ObjectId antes de consultas ao banco

## Estrutura do projeto

```
src/
  config/
    database.ts       # Conexão com MongoDB
  controllers/
    userController.ts # Lógica das operações CRUD
  models/
    User.ts           # Schema e model do usuário
  routes/
    userRoutes.ts     # Definição das rotas
  app.ts              # Configuração do Express
  server.ts           # Ponto de entrada da aplicação
.env                  # Variáveis de ambiente (não versionado)
.gitignore
package.json
tsconfig.json
```

## Autor

**Emmanuel Bonifacio**
- GitHub: [@EmmanuelBonifacio](https://github.com/EmmanuelBonifacio)
