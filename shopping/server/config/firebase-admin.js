//firebase-admin configuration
import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';

// console.log(process.env.FIREBASE_SERVICE_ACCOUNT)
// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null; // Fallback if environment variable is not set

if (!serviceAccount) {
  throw new Error('Firebase service account credentials are missing.');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firebaseAdmin = admin.app();
export default firebaseAdmin;