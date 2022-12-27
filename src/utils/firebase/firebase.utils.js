import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV4T_HEBQLUrz_hcwm8CY93VN8d-fm590",
  authDomain: "crwn-clothing-v3-df72d.firebaseapp.com",
  projectId: "crwn-clothing-v3-df72d",
  storageBucket: "crwn-clothing-v3-df72d.appspot.com",
  messagingSenderId: "793385574623",
  appId: "1:793385574623:web:e8dd3b6ca61e1c01c9496a",
};

// Initialize Firebase
// instantiate firebase app
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

//instantiate auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// instaniate firestore database
export const db = getFirestore();

// data created from authentication
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // get the data from authentication and put it in a snapshot
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
