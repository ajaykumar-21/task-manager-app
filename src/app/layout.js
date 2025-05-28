import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Task Manager App",
  description:
    "A full-stack, real-time task management app with drag-and-drop functionality and AI-powered task suggestions.",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 1000, // auto-dismiss after 1 seconds
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
