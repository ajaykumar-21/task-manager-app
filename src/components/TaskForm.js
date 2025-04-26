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
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-lg transition-all font-semibold shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
