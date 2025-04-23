"use client";

import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = () => {
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
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
      <button
        onClick={handleSubmit}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}
