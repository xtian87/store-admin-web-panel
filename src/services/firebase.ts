import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_et4nED-IM4KZswO6vxn_TrEIj27K3y4",
  authDomain: "store-cadc8.firebaseapp.com",
  projectId: "store-cadc8",
  storageBucket: "store-cadc8.firebasestorage.app",
  messagingSenderId: "626475566960",
  appId: "1:626475566960:web:be35283665d2103bc9b1b5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
