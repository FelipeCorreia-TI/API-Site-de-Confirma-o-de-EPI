const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let credential;

if (process.env.FIREBASE_CREDENTIALS) {
    try {
        credential = JSON.parse(process.env.FIREBASE_CREDENTIALS);
        // Corrige a formatação da chave privada vinda do Render
        if (credential.private_key) {
            credential.private_key = credential.private_key.replace(/\\n/g, '\n');
        }
    } catch (erro) {
        console.error("Erro ao fazer parse da variavel FIREBASE_CREDENTIALS:", erro);
    }
} else {
    try {
        credential = require('../serviceAccountKey.json');
    } catch (erro) {
        console.warn("Arquivo serviceAccountKey.json nao encontrado localmente.");
    }
}

// Inicialização segura
if (!getApps().length && credential) {
    initializeApp({
        credential: cert(credential)
    });
}

const db = getFirestore();

module.exports = { db };