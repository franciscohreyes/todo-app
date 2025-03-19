import admin from "firebase-admin";

// Inicializar Firebase Admin
admin.initializeApp();

const db = admin.firestore();

export {db};
