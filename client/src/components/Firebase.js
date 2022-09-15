import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6xca1kHqmxhKlBEMEJwE1Q0DudLnyZvk",
  authDomain: "streams-eda52.firebaseapp.com",
  projectId: "streams-eda52",
  storageBucket: "streams-eda52.appspot.com",
  messagingSenderId: "1003025476797",
  appId: "1:1003025476797:web:a5dc37a038aecdb9a15bd4",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
