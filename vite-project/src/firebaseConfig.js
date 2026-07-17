// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvf2rcggdaJXsgUqw_QRx1WToKujxzTWo",
  authDomain: "firstdb-94518.firebaseapp.com",
  databaseURL: "https://firstdb-94518-default-rtdb.firebaseio.com",
  projectId: "firstdb-94518",
  storageBucket: "firstdb-94518.firebasestorage.app",
  messagingSenderId: "711688420833",
  appId: "1:711688420833:web:fe74f0071543bc7a5f66a0",
  measurementId: "G-TBNNDCZE0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig