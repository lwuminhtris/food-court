import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const key = require("./key.json");

initializeApp({
  credential: cert(key),
});

const db = getFirestore();
export default db;
