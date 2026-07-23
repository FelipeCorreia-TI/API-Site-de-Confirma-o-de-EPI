const express = require("express");

const router = express.Router();

router.get("/health", (req, res) =>{
    return res.status(200).json({
        status: "online",
        api: "Controle de EPIs",
        version: "1.0.0"
    });
});

module.exports = router;