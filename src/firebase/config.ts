import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCGYoWDK0gwY05LdzsB4-ktcPOi6hokBQc",
  authDomain: "nex-cart-e4311.firebaseapp.com",
  projectId: "nex-cart-e4311",
  storageBucket: "nex-cart-e4311.firebasestorage.app",
  messagingSenderId: "853480417389",
  appId: "1:853480417389:web:4147145edbc7e053673764"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;