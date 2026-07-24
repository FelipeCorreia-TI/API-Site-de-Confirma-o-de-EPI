const express = require("express");
const router = express.Router();

const estoqueRoutes = require("./estoque");

// Rota de Health Check
router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "online",
    api: "Controle de EPIs",
    version: "1.0.0",
  });
});

// Agrupamento das rotas de estoque (/api/estoque)
router.use("/estoque", estoqueRoutes);

module.exports = router;