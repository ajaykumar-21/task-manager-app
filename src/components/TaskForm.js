"use client";

import { useState } from "react";
import axios from "axios";

export default function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!newTask.trim()) return;
    onAdd(newTask);
    setNewTask("");
  };

  const suggestTask = async (prompt) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/suggest", { prompt });
      if (res.data.suggestion) {
        onAdd(res.data.suggestion);
      }
    } catch (error) {
      console.error("Suggestion error:", error);
    } finally {
      setLoading(false);
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
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>

        {loading ? (
          <div className="flex-1 bg-gray-700 text-white p-2 rounded text-center animate-pulse">
            Thinking...
          </div>
        ) : (
          <>
            <button
              onClick={() =>
                suggestTask("Suggest a fun task to do in free time")
              }
              className="flex-1 bg-pink-600 hover:bg-pink-500 text-white p-2 rounded"
            >
              🎉 Fun Task
            </button>
            <button
              onClick={() =>
                suggestTask("Suggest a productivity-boosting work task")
              }
              className="flex-1 bg-green-600 hover:bg-green-500 text-white p-2 rounded"
            >
              📈 Work Task
            </button>
            <button
              onClick={() =>
                suggestTask("Suggest a task to learn something new")
              }
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white p-2 rounded"
            >
              📚 Study Task
            </button>
          </>
        )}
      </div>
    </div>
  );
}
