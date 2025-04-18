import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration details
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initializes the Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);
console.log(app);

// Initialize Firebase authentication and database
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };

// Function to sign in users using Google authentication
// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googlProvider);
//     // console.log(result);
//     return result.user;
//   } catch (error) {
//     console.error("Google Sign-In Error", error);
//   }
// };

// // Function to log out the currently authenticated user
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     console.log("Logout Error", error);
//   }
// };
