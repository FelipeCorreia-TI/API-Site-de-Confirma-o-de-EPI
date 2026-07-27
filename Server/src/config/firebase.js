const admin = require("firebase-admin");

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

// Inicialização com a biblioteca clássica 'admin'
if (!admin.apps.length && credential) {
    admin.initializeApp({
        credential: admin.credential.cert(credential)
    });
}

// O db retornado pelo admin.firestore() POSSUI a função .collection()
const db = admin.firestore();

module.exports = { db };