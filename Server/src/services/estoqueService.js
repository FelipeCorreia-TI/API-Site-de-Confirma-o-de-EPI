const db = require("../config/firebase");

const buscarTodoEstoque = async () => {
    const snapshot = await db.collection("estoque").get();

    if (snapshot.empty){
        return[];
    }
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

