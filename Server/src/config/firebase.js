const admin = require("firebase-admin");
const { initializeApp, cert, getApps } = require("firebase-admin/app");

let credential;

if (process.env.FIREBASE_CREDENTIALS) {
    try {
        credential = JSON.parse(process.env.FIREBASE_CREDENTIALS);

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

if (!getApps().length && credential) {
    initializeApp({
        credential: cert(credential)
    });
}


const db = admin.firestore();

module.exports = { db };