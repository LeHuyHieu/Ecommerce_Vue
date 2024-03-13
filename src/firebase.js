import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/firestore"
import { getStorage } from "firebase/storage";

let config = {
  apiKey: "AIzaSyDMy5gnUqJE-RWaCdDfjW-MDxJESWLVOZU",
  authDomain: "crudvue-f7a7a.firebaseapp.com",
  projectId: "crudvue-f7a7a",
  storageBucket: "crudvue-f7a7a.appspot.com",
  messagingSenderId: "393510306862",
  appId: "1:393510306862:web:97e35591a96e4452480bbf",
  measurementId: "G-4TTPJY78Y9"
};

const app = initializeApp(config);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage();

export { auth, database, storage };
