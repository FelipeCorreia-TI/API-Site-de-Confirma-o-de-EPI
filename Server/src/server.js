require("dotenv").config();

const express = require("express");

const {
    enviarEmailTeste
} = require("./services/email");

const app = express();

app.use(express.json());

app.listen(3000, () => {

    console.log(
        "Servidor rodando na porta 3000"
    );

});