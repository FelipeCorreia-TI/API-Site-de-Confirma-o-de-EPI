const { db } = require("../config/firebase");

async function registrarPreReserva(dados) {

    console.log("INICIOU registrarPreReserva");

    const { email, itens } = dados;

    const novaPreReservaRef =
        db.collection("preReservas").doc();

    await novaPreReservaRef.set({

        email,

        itens,

        status: "aguardando",

        dataCriacao: new Date().toISOString()

    });

    console.log("SALVOU NO FIRESTORE");

    return {
        id: novaPreReservaRef.id
    };
}

module.exports = {
    registrarPreReserva
};