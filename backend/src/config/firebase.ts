import admin from 'firebase-admin';
import { ENV } from './env';

// Inicialización de Firebase Admin
// En producción se requiere definir las credenciales apropiadamente
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: ENV.FIREBASE_PROJECT_ID,
    // credential: admin.credential.applicationDefault() 
  });
}

export const db = admin.firestore();
