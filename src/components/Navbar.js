"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path ? "text-yellow-400 font-semibold" : "hover:text-blue-300";

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-400">
        Task Manager 📝
      </Link>

      <div className="space-x-4">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        {!user ? (
          <>
            <Link href="/register" className={linkClass("/register")}>
              Register
            </Link>
            <Link href="/login" className={linkClass("/login")}>
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
