import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAeOgQYxah8z0bL9eL_4HufedQpnJXL16E",
    authDomain: "react-personal-todolist.firebaseapp.com",
    databaseURL: "https://react-personal-todolist-default-rtdb.firebaseio.com",
    projectId: "react-personal-todolist",
    storageBucket: "react-personal-todolist.appspot.com",
    messagingSenderId: "811463868789",
    appId: "1:811463868789:web:aa00e0123cef39d50ed33c"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;


