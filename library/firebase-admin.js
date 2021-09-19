import admin from 'firebase-admin';

if (!admin.apps.length) {
  const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-demo.firebaseio.com'
  });
}

export default admin.firestore();
