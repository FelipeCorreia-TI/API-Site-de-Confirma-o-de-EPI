const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// E-mail de teste
async function enviarEmailTeste() {
    const resultado = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["cpfllinhas@gmail.com"],
        subject: "Teste API EPI",
        html: `
            <h1>Teste realizado com sucesso!</h1>
            <p>A API do sistema de EPI está funcionando.</p>
        `
    });

    console.log(resultado);
}

// E-mail de confirmação de retirada
async function enviarEmailRetirada(dados) {
    // Formata a data atual se não for passada no payload
    const dataFormatada = new Date().toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const resultado = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["cpfllinhas@gmail.com"],
        subject: `Nova Retirada de EPI - ${dados.nome}`,
        html: `
            <h2>Nova Retirada de EPI</h2>
            
            <p><strong>Funcionário:</strong> ${dados.nome}</p>
            <p><strong>Base Operacional:</strong> ${dados.baseOperacional}</p>
            <p><strong>Data da Retirada:</strong> ${dataFormatada}</p>

            <h3>EPIs Retirados</h3>
            <ul>
                ${dados.itens && Array.isArray(dados.itens) 
                    ? dados.itens.map(item => `<li><strong>${item.quantidade}x</strong> ${item.nome}</li>`).join("")
                    : "<li>Nenhum item listado</li>"
                }
            </ul>

            ${dados.assinatura ? `
                <h3>Assinatura do Funcionário</h3>
                <img src="${dados.assinatura}" alt="Assinatura" style="max-width: 300px; border: 1px solid #ccc; padding: 5px;"/>
            ` : ""}
        `
    });

    console.log("E-mail enviado com sucesso:", resultado);
}

module.exports = {
    enviarEmailTeste,
    enviarEmailRetirada
};