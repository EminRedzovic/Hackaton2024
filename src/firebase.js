import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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

export const submitLoginData = async (data) => {
  const result = await addDoc(collection(db, "users"), {
    ...data,
    userId: auth.currentUser.uid,
  });
  return result;
};
export const getUserData = async (id) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData;
    } else {
      throw new Error("Dokument korisnika nije pronađen");
    }
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka korisnika:", error);
  }
};

export const isUsernameAvailable = async (name) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("displayName", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error(error);
    return false;
  }
};
