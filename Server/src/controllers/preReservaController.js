const {
    registrarPreReserva
} = require("../services/preReservaService");

async function criarPreReserva(req, res) {

    try {

        const { email, itens } = req.body;

        if (!email) {
            return res.status(400).json({
                sucesso: false,
                erro: "E-mail é obrigatório."
            });
        }

        if (!itens || !Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({
                sucesso: false,
                erro: "Nenhum item informado."
            });
        }

        const resultado =
            await registrarPreReserva({
                email,
                itens
            });

        return res.status(201).json({
            sucesso: true,
            mensagem: "Pré-reserva registrada com sucesso.",
            id: resultado.id
        });

    } catch (erro) {

        console.error(
            "Erro ao registrar pré-reserva:",
            erro
        );

        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno."
        });

    }
}

module.exports = {
    criarPreReserva
};