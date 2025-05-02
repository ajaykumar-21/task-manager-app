import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "Missing task ID" });

  if (req.method === "DELETE") {
    await deleteDoc(doc(db, "tasks", id));
    return res.status(200).json({ message: "Task deleted" });
  }

  if (req.method === "PATCH") {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "Missing status" });
    await updateDoc(doc(db, "tasks", id), { status });
    return res.status(200).json({ message: "Task updated" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
