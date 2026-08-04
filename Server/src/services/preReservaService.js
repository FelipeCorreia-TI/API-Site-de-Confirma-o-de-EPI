const { db } = require("../config/firebase");

async function registrarPreReserva(dados) {

    const {
        email,
        itens
    } = dados;

    const novaPreReservaRef =
        db.collection("preReservas").doc();

    await novaPreReservaRef.set({

        email,

        itens,

        status: "aguardando",

        dataCriacao: new Date().toISOString()

    });

    return {
        id: novaPreReservaRef.id
    };
}

module.exports = {
    registrarPreReserva
};