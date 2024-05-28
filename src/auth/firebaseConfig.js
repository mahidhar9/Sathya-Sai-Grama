import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAbJzWpoO-oybw1eTt7TrOhNXl2SFgZ2ds",
  authDomain: "sathya-sai-grama-1.firebaseapp.com",
  projectId: "sathya-sai-grama-1",
  storageBucket: "sathya-sai-grama-1.appspot.com",
  messagingSenderId: "142974661728",
  appId: "1:142974661728:web:f4410ff7824a05a28f7f05",
  measurementId: "G-QKP2HJ3Y0G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

