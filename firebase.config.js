// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzrYzpJbNXEqyma2CrHFOFq-cn5DRcPcE",
  authDomain: "contactapp-cb4e8.firebaseapp.com",
  projectId: "contactapp-cb4e8",
  storageBucket: "contactapp-cb4e8.appspot.com",
  messagingSenderId: "330499845624",
  appId: "1:330499845624:web:bfc623ead797879b4cba0d",
  measurementId: "G-BVV63SJ4C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)

export const firestore = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);