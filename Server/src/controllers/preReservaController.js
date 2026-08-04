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

        console.log("=== NOVA PRÉ-RESERVA ===");
        console.log("Email:", email);
        console.log("Itens:", itens);

        return res.status(201).json({
            sucesso: true,
            mensagem: "Pré-reserva recebida."
        });

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno."
        });

    }

}

module.exports = {
    criarPreReserva
};