const express = require("express");

const router = express.Router();

const {
    enviarEmailRetirada
} = require("../services/email");

router.post("/", async (req, res) => {

    try {

        console.log(req.body);

        await enviarEmailRetirada(req.body);

        res.json({
            sucesso: true
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            sucesso: false
        });
    
    }

});

module.exports = router;