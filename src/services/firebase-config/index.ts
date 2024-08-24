// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = import.meta.env
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_REACT_FIREBASE_API_KEY,
  authDomain: env.VITE_REACT_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_REACT_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_REACT_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
