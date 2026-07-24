const { initializeApp, cert, getApps} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const path= require("path");

let credential;

if (process.env.FIREBASE_PRIVATE_KEY){
    credential = cert ({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n")
    })
}else{
    const serviceAccountPath = path.resolve(__dirname,"../serviceAccountKey.json")
    const serviceAccount = require(serviceAccountPath);

    credential = cert(serviceAccount)
}



if(!getApps().length){
    initializeApp({credential});
}


const db= getFirestore();

module.exports = db;