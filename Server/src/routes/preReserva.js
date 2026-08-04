const express = require("express");
const router = express.Router();

const {
    criarPreReserva
} = require("../controllers/preReservaController");

router.get("/", (req, res) => {

    res.json({
        sucesso: true,
        mensagem: "Rota de pré-reserva funcionando."
    });

});

router.post("/", criarPreReserva);

module.exports = router;