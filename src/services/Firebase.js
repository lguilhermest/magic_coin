import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4VPZ_Grp2qgbqkVyYSsSJEENgE7WaqIE",
  authDomain: "magic-coin-4c42b.firebaseapp.com",
  projectId: "magic-coin-4c42b",
  storageBucket: "magic-coin-4c42b.appspot.com",
  messagingSenderId: "1079426668973",
  appId: "1:1079426668973:web:869f9958ef2cb4c1132924"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);