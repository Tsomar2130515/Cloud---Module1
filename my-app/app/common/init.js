import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

export default function() {

  const firebaseConfig = {
  apiKey: "AIzaSyALm0CjDnEfTIP8Ic88gBdekXRHWsoGgNo",
  authDomain: "my-app-279e9.firebaseapp.com",
  projectId: "my-app-279e9",
  storageBucket: "my-app-279e9.appspot.com",
  messagingSenderId: "1055061081629",
  appId: "1:1055061081629:web:992cb8fb108af9e46f90f4"
};
  const app = initializeApp(firebaseConfig)
  const auth = getAuth()
  const db = getFirestore(app)

  return {auth, db}
}