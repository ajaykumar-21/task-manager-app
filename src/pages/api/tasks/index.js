import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const snapshot = await getDocs(collection(db, "tasks"));
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("✅ API fetched tasks:", snapshot.size);
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });
    await addDoc(collection(db, "tasks"), { text, status: "todo" });
    console.log("➕ Task added:", text);
    return res.status(201).json({ message: "Task added" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
