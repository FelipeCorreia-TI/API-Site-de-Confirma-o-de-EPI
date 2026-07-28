const express = require("express");
const router = express.Router();

// Importa o controller que gerencia a validação, o Firebase e o e-mail
const { criarEntrega } = require("../controllers/entregaController");

router.post("/", criarEntrega);

module.exports = router;