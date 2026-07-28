const {db} = require("../config/firebase");

async function registrarEntrega(dados) {
    const { nome, baseOperacional, itens, assinatura } = dados;


    return await db.runTransaction(async (transaction) => {
        const leiturasEstoque = [];

        // 1. Fazer TODAS as leituras primeiro (regra do Firestore para transações)
        for (const item of itens) {
            const itemRef = db.collection("estoque").doc(item.id);
            const doc = await transaction.get(itemRef);

            if (!doc.exists) {
                throw new Error(`Item ${item.nome || item.id} não foi encontrado no estoque.`);
            }

            const dadosItem = doc.data();
            const qtdAtual = dadosItem.quantidade ?? dadosItem["quantidade "] ?? 0;
            const qtdSolicitada = Number(item.quantidade);

            // Valida se há estoque suficiente antes de prosseguir
            if (qtdAtual < qtdSolicitada) {
                throw new Error(`Estoque insuficiente para o item "${dadosItem.nome || item.nome}". Disponível: ${qtdAtual}, Solicitado: ${qtdSolicitada}`);
            }

            leiturasEstoque.push({
                ref: itemRef,
                novaQuantidade: qtdAtual - qtdSolicitada
            });
        }

    // 2. Fazer TODAS as escritas após a verificação
        
        // A) Grava o registro da entrega
        const novaEntregaRef = db.collection("entregas").doc();
        transaction.set(novaEntregaRef, {
            nome,
            baseOperacional,
            itens,
            assinatura,
            dataEntrega: new Date().toISOString()
        });

        // B) Atualiza a quantidade de cada item no estoque
        for (const itemAtualizado of leiturasEstoque) {
            transaction.update(itemAtualizado.ref, {
                quantidade: itemAtualizado.novaQuantidade
            });
        }

        return {
            id: novaEntregaRef.id,
            mensagem: "Entrega registrada e estoque atualizado com sucesso!"
        };
    });
}

module.exports = { registrarEntrega };