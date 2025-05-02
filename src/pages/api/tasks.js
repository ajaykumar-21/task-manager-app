import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  try {
    const snapshot = await getDocs(collection(db, "tasks"));
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Firestore fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}
