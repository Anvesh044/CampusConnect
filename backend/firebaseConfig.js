const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "campusconnect-85005.appspot.com", // ← Replace with your actual Firebase storage bucket URL
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };

