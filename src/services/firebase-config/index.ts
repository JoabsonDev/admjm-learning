// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD9Y5vR075cNt7OY1iDSELa76OqeY2je8",
  authDomain: "adjm-learning.firebaseapp.com",
  projectId: "adjm-learning",
  storageBucket: "adjm-learning.appspot.com",
  messagingSenderId: "1030004632224",
  appId: "1:1030004632224:web:aa035b218aec4aa151f7c5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
