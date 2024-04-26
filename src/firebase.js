import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRZJOSYT0lmy6GO7qWvPqfGNgq9dN3o68",
  authDomain: "uninp-hackaton.firebaseapp.com",
  projectId: "uninp-hackaton",
  storageBucket: "uninp-hackaton.appspot.com",
  messagingSenderId: "304390387693",
  appId: "1:304390387693:web:284deaece290ac1efa59e4",
  measurementId: "G-2LSGVYMZXL",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
