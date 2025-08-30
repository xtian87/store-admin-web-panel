import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "-",
  authDomain: "",
  projectId: "",
  storageBucket: "s",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
