
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAte_ipPVg23VOnxpF24IieHtuNLyTJCPk",
    authDomain: "multisesiones.firebaseapp.com",
    projectId: "multisesiones",
    storageBucket: "multisesiones.appspot.com",
    messagingSenderId: "206280400714",
    appId: "1:206280400714:web:4517212b6cedd6aaeeebb3",
    measurementId: "G-G6LEHF8LK4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword };
