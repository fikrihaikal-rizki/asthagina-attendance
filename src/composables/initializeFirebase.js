import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { fileToJson } from "./fileToJson";

export function firebaseApp() {
  const config = import.meta.env.VITE_FIREBASE_CREDENTIALS;
  const firebaseConfig = fileToJson(config);

  return initializeApp(firebaseConfig);
}

export function firestoreDb() {
  return getFirestore(firebaseApp());
}

const db = firestoreDb();

export function firestoreDoc(collectionRef, docRef) {
  const ref = doc(db, collectionRef, docRef);
  
  return getDoc(ref);
}
