const { Resend } = require("resend");

const resend = new Resend(
    process.env.RESEND_API_KEY
);

async function enviarEmailTeste() {

    const resultado = await resend.emails.send({

        from: "onboarding@resend.dev",

        to: ["process.env.RESPONSIBLE"],

        subject: "Teste API EPI",

        html: `
            <h1>Teste realizado com sucesso!</h1>

            <p>A API do sistema de EPI está funcionando.</p>
        `
    });

    console.log(resultado);
}

module.exports = {
    enviarEmailTeste
};