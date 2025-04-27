"use client";

import { useState } from "react";
import axios from "axios";

export default function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = () => {
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
  };

  const suggestTask = async () => {
    try {
      console.log("rhne de");
      const res = await axios.post("/api/suggest");
      console.log(res);
      if (res.data.suggestion) {
        onAdd(res.data.suggestion);
      }
    } catch (error) {
      console.error("Suggestion error:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
        <button
          onClick={suggestTask}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white p-2 rounded"
        >
          ✨ Suggest Task
        </button>
      </div>
    </div>
  );
}
