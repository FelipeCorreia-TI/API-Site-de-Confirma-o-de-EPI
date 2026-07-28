const { registrarEntrega } = require("../services/entregaService");
const { enviarEmailRetirada } = require("../services/email"); // Importa o envio de e-mail

async function criarEntrega(req, res) {
    try {
        const { nome, baseOperacional, itens, assinatura } = req.body;

        // 1. Validações básicas de segurança do payload
        if (!nome || typeof nome !== "string" || nome.trim() === "") {
            return res.status(400).json({ sucesso: false, erro: "O nome do funcionário é obrigatório." });
        }

        if (!baseOperacional) {
            return res.status(400).json({ sucesso: false, erro: "A base operacional é obrigatória." });
        }

        if (!itens || !Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({ sucesso: false, erro: "Selecione ao menos um EPI para realizar a entrega." });
        }

        if (!assinatura) {
            return res.status(400).json({ sucesso: false, erro: "A assinatura é obrigatória." });
        }

        // 2. Transação no Firestore: Baixa no Estoque + Registro da Entrega
        const resultadoBanco = await registrarEntrega({ nome, baseOperacional, itens, assinatura });

        // 3. Se a gravação e a transação deram certo, dispara o E-mail em segundo plano
        try {
            await enviarEmailRetirada(req.body);
        } catch (erroEmail) {
            // Logamos o erro de e-mail, mas não travamos a resposta já que o estoque já foi baixado
            console.error("A entrega foi gravada, mas houve falha ao enviar o e-mail:", erroEmail);
        }

        // 4. Retorna resposta de sucesso para o Front-end
        return res.status(201).json({
            sucesso: true,
            mensagem: "Entrega registrada, estoque atualizado e e-mail enviado!",
            idEntrega: resultadoBanco.id
        });

    } catch (erro) {
        console.error("Erro ao processar entrega:", erro.message);

        // Se a transação falhar (ex: estoque insuficiente), cai aqui e NÃO envia o e-mail
        if (erro.message.includes("Estoque insuficiente") || erro.message.includes("não foi encontrado")) {
            return res.status(400).json({ sucesso: false, erro: erro.message });
        }

        return res.status(500).json({ sucesso: false, erro: "Falha interna ao processar a entrega." });
    }
}

module.exports = { criarEntrega };