import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, signInWithGoogle, logout } from "@/lib/firebase";
import { use, useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser);
  console.log(user);

  // Listen for authentication state changes and update user state
  auth.onAuthStateChanged((currentUser) => setUser(currentUser));

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Signup Error", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white p-2 rounded mt-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={signIn}
              className="w-full bg-blue-500 text-white p-2 rounded mb-2"
            >
              Login
            </button>
            <button
              onClick={signUp}
              className="w-full bg-green-500 text-white p-2 rounded mb-2"
            >
              Sign Up
            </button>
            <button
              onClick={signInWithGoogle}
              className="w-full bg-yellow-500 text-white p-2 rounded"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
