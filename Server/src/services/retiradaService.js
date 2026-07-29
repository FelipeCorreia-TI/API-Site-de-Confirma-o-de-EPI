const { db } = require("../config/firebase");

function obterDataHoraSaoPaulo() {
    const agora = new Date();
    
    // Formata no padrão pt-BR considerando o Timezone de SP
    const formatador = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    return formatador.format(agora); // Retorna algo como: "29/07/2026, 14:35:10"
}

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

        const novaEntregaRef = db.collection("retirada").doc();
        transaction.set(novaEntregaRef, {
            nome,
            baseOperacional,
            itens,
            assinatura,
            dataEntregaFormatted: obterDataHoraSaoPaulo(), // Ex: "29/07/2026, 14:35:10"
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