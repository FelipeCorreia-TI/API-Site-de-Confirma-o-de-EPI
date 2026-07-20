require("dotenv").config();

const express = require("express");

const {
    enviarEmailTeste
} = require("./services/email");

const app = express();

app.get("/", async (req, res) => {

    try {

        await enviarEmailTeste();

        res.send(
            "Email enviado com sucesso!"
        );

    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            "Erro ao enviar email"
        );

    }

});

app.listen(3000, () => {

    console.log(
        "Servidor rodando na porta 3000"
    );

});