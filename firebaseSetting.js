import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBkIaKIlgW_aPaNKKxDL09D91g6EI5j0M",
  authDomain: "fir-api-e6b93.firebaseapp.com",
  projectId: "fir-api-e6b93",
  storageBucket: "fir-api-e6b93.appspot.com",
  messagingSenderId: "743357854510",
  appId: "1:743357854510:web:b4fcfade1f5e54633d40bf",
  measurementId: "G-TB77DFHDQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default db = getFirestore(app)