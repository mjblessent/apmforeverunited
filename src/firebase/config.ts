// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC91Wj7fZjvyLCfHmg2PP34Y_4Qvi-IfPA",
  authDomain: "apmforeverunited.firebaseapp.com",
  projectId: "apmforeverunited",
  storageBucket: "apmforeverunited.appspot.com",
  messagingSenderId: "718349707326",
  appId: "1:718349707326:web:a9ad09cd67cd73da9b896f",
  measurementId: "G-DD4K68CJX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };