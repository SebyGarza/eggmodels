// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjIoVHbffwS4xrjkxPMtAINtOp-HOBf5I",
  authDomain: "egg-models.firebaseapp.com",
  databaseURL: "https://egg-models-default-rtdb.firebaseio.com",
  projectId: "egg-models",
  storageBucket: "egg-models.appspot.com",
  messagingSenderId: "65532519656",
  appId: "1:65532519656:web:534108585a64a4f57cd55d",
  measurementId: "G-G8QVJTLRJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);