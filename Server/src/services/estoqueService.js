const {db} = require("../config/firebase");

async function buscarTodoEstoque() {
    const snapshot = await db.collection("estoque").get();

    const estoque = [];
    snapshot.forEach((doc) =>{
        estoque.push({
        id: doc.id,
        ...doc.data(),
    });
});

    return estoque;
};

module.exports = {
    buscarTodoEstoque,
};

