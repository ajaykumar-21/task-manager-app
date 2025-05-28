"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.error("✅ Logged in successfully");
    } catch (error) {
      toast.error("❌ Login error: ${error.message}");
      console.log("Login error", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input
        className="w-full p-2 rounded bg-gray-800 text-white"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 rounded bg-gray-800 text-white"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
