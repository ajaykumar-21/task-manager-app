"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Registered successfully");
    } catch (error) {
      alert(`❌ Registration error: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 max-w-sm mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

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

      <input
        className="w-full p-2 rounded bg-gray-800 text-white"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button
        className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
