const { Resend } = require("resend");

const resend = new Resend(
    process.env.RESEND_API_KEY
);
    //email de teste!
async function enviarEmailTeste() {

    const resultado = await resend.emails.send({

        from: "onboarding@resend.dev",

        to: ["matheusampaio098@gmail.com"],

        subject: "Teste API EPI",

        html: `
            <h1>Teste realizado com sucesso!</h1>

            <p>A API do sistema de EPI está funcionando.</p>
        `
    });

    console.log(resultado);
}

    //EMAIL REAL!
async function enviarEmailRetirada(dados) {
    
    const resultado = await resend.emails.send({

        from: "onboarding@resend.dev",

        to: ["matheusampaio098@gmail.com"],

        subject: `Nova Retirada de EPI - ${dados.nome}`,

        html: `
            <h2>Nova Retirada de EPI</h2>
            
            <p><strong>Funcionário:</strong> ${dados.nome}</p>

            <p><strong>Base Operacional:</strong> ${dados.baseoperacional}</p>

            <p><strong>Data da Retirada:</strong> ${dados.dataretirada}</p>

            <p><strong>Quantidade:</strong> ${dados.quantidade}</p>

            <h3>Epis Retirados</h3>

            <ul>
                ${dados.episSelecionados
                    .map(epi => `<li>${epi}</li>`)
                    .join("")}
            </ul>
        `
    });

    console.log(resultado);
}
module.exports = {
    enviarEmailTeste,
    enviarEmailRetirada
};
