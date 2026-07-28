# ⚙️ Sistema de Controle de Retirada de EPI - Back-end API

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![Firebase](https://img.shields.io/badge/Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase)
![Resend](https://img.shields.io/badge/Resend_Email-000000?style=for-the-badge&logo=resend)

Esta é a API RESTful do sistema de **Controle de Retirada de Equipamentos de Proteção Individual (EPI)** da **CPFL Energia**. O backend é responsável por gerenciar as transações com o banco de dados Firebase Firestore, garantir consistência no estoque via transações atômicas e disparar e-mails de notificação automatizados via Resend.

---

## 👨‍💻 Desenvolvedores

* **Matheus Cavalcante Sampaio** - [@MatheusCSampaio](https://github.com/MatheusCSampaio)
* **Felipe Correia** - [@FelipeCorreia-TI](https://github.com/FelipeCorreia-TI)

---

## 🚀 Tecnologias e Bibliotecas Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework web para criação das rotas e middlewares HTTP.
- **Firebase Admin SDK**: Comunicação e manipulação segura do banco de dados **Firestore**.
- **Resend SDK**: Serviço de envio de e-mails transacionais (com relatórios em HTML e confirmações).
- **CORS**: Middleware para liberação e controle de acessos da aplicação Front-end.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📦 Arquitetura e Estrutura do Projeto

O projeto adota o padrão de arquitetura em camadas (**Controller - Service - Route**):

```text
api-epi-backend/
├── src/
│   ├── config/
│   │   └── firebase.js          # Conexão e autenticação com o Firebase Admin
│   ├── controllers/
│   │   ├── estoqueControllers.js # Controller de consulta de estoque
│   │   └── retiradaController.js # Controller de registro de retiradas
│   ├── routes/
│   │   ├── entrega.js            # Definição das rotas de entrega
│   │   ├── estoque.js            # Definição das rotas de estoque
│   │   └── index.js              # Agrupador central de rotas
│   ├── services/
│   │   ├── emailService.js       # Envio de e-mails via Resend API
│   │   ├── estoqueService.js     # Regra de negócio e consultas ao Firestore
│   │   └── retiradaService.js    # Transações atômicas de baixa no estoque
│   └── app.js                   # Configuração de middlewares do Express
├── scripts/
│   └── sincronizarEstoqueCompleto.js # Script de carga/sincronização do banco
├── server.js                     # Ponto de entrada do servidor HTTP
└── package.json                  # Dependências e scripts do projeto
```

---

## ⚙️ Funcionalidades e Regras de Negócio

1. **Consulta de Estoque (`GET /estoque`)**
   - Retorna a lista de todos os EPIs cadastrados com nome, saldo atual e quantidade padrão.

2. **Registro Transacional de Retirada (`POST /entrega`)**
   - Utiliza **Firestore Transactions (`db.runTransaction`)** para garantir atomicidade.
   - Valida se todos os itens solicitados possuem saldo suficiente antes de efetuar qualquer alteração.
   - Atualiza o saldo do estoque e salva o comprovante da entrega (com nome, base operacional, itens e assinatura digital) na coleção `retirada`.

3. **Notificação Automatizada por E-mail**
   - Integração com a API do **Resend** no `emailService.js` para enviar uma cópia em HTML da retirada realizada para a equipe responsável.

---

## 🔗 Endpoints da API REST

### 1. Consultar Estoque
- **URL:** `/estoque`
- **Método:** `GET`
- **Resposta de Sucesso (200 OK):**
```json
[
  {
    "id": "doc_id_123",
    "nome": "CAPACETE DE SEGURANÇA",
    "quantidade": 14,
    "quantidadePadrao": 1
  }
]
```

### 2. Registrar Retirada de EPI
- **URL:** `/entrega`
- **Método:** `POST`
- **Corpo da Requisição (JSON):**
```json
{
  "nome": "Matheus Cavalcante Sampaio",
  "baseOperacional": "Base Piracicaba",
  "itens": [
    { "nome": "CAPACETE DE SEGURANÇA", "quantidade": 1 },
    { "nome": "LUVA DE VAQUETA tam G", "quantidade": 2 }
  ],
  "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSU..."
}
```
- **Resposta de Sucesso (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Entrega registrada e estoque atualizado com sucesso!",
  "id": "id_da_retirada_gerado"
}
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto contendo as seguintes chaves de configuração:

```env
PORT=3000
RESEND_API_KEY=re_123456789_seu_token_aqui
FIREBASE_CREDENTIALS={"type":"service_account","project_id":"seu-projeto",...}
TZ=America/Sao_Paulo
```

> **Nota:** Em ambiente local, se `FIREBASE_CREDENTIALS` não estiver definido, o projeto tentará carregar as credenciais a partir do arquivo `serviceAccountKey.json`.

---

## 🛠️ Como Executar o Projeto Localmente

1. Clone o repositório do backend:
   ```bash
   git clone https://github.com/MatheusCSampaio/API-Site-de-Confirma-o-de-EPI.git
   ```

2. Acesse a pasta do projeto e instale as dependências:
   ```bash
   cd API-Site-de-Confirma-o-de-EPI
   npm install
   ```

3. Configure o arquivo `.env` com suas credenciais do Firebase e Resend.

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm start
   # ou node server.js
   ```

5. O servidor estará rodando em `http://localhost:3000`.

---

## 📜 Licença

Projeto desenvolvido para automação do controle de estoque e entrega de EPIs na **CPFL Energia**.