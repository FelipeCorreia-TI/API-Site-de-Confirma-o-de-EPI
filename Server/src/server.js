require("dotenv").config();

console.log(process.env.RESEND_API_KEY);

const express = require("express");
const cors = require("cors");

const entregaRoutes = require("./routes/entrega");

const {
    enviarEmailTeste
} = require("./services/email");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/entrega", entregaRoutes);

app.get("/", async (req,res) => {

    try{

        await enviarEmailTeste();

        res.send(
            "Email enviado com sucesso!"
        );
    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            erro.message
        );

    }
});

app.listen(3000, () => {

    console.log(
        "Servidor rodando na porta 3000"
    );

});