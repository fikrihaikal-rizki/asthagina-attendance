import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { fileToJson } from "./fileToJson";

export function firebaseApp() {
  const config = import.meta.env.VITE_FIREBASE_CREDENTIALS;
  // const firebaseConfig = fileToJson(config);

  // return initializeApp(firebaseConfig);
  return initializeApp({
    apiKey: "AIzaSyAevTnZjDHbP4K5tFiDo4l8bgeiCeSGQRk",
    authDomain: "shvc-f7e1f.firebaseapp.com",
    databaseURL: "https://shvc-f7e1f.firebaseio.com",
    projectId: "shvc-f7e1f",
    storageBucket: "shvc-f7e1f.firebasestorage.app",
    messagingSenderId: "280000831313",
    appId: "1:280000831313:web:d2104166eccf532620fd70"
  });
}

export function firestoreDb() {
  return getFirestore(firebaseApp());
}

const db = firestoreDb();

export function firestoreDoc(collectionRef, docRef) {
  const ref = doc(db, collectionRef, docRef);
  
  return getDoc(ref);
}
