const { initializeApp, cert, getApps} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

let credential;

if (process.env.FIREBASE_CREDENTIALS){
    try{
        credential = JSON.parse(process.env.FIREBASE_CREDENTIALS);
    } catch (erro){
        console.log("Erro ao fazer parse da variavel FIREBASE_CREDENTIALS:",erro);
    }
}else{
    try{
        credential = require('../serviceAccountKey.json')
    }catch(erro){
        console.log("Arquivo serviceAccountKey.json nao encontrado localmente.");
    }
}



if(!getApps().length && credential){
    initializeApp({
        credential: cert(credential)
    });
}


const db= getFirestore();

module.exports = {db};