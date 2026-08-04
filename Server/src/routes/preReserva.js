const express = require("express");
const router = express.Router();

const {
    criarPreReserva
} = require("../controllers/preReservaController");

router.post("/", criarPreReserva);

module.exports = router;