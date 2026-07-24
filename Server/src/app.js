const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app= express();

//middlewares
app.use(cors());
app.use(express.json());

//Rotas - futuramentente
app.use("/api",routes)

module.exports= app;