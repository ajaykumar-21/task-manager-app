"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from Firestore when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Load tasks from Firebase Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
  };

  // Add a new task to Firestore
  const addTask = async () => {
    if (!newTask.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text: newTask,
      completed: false,
    });
    setNewTask("");
    fetchTasks();
  };

  // Toggle task completed status in Firestore
  const toggleTask = async (id, currentStatus) => {
    await updateDoc(doc(db, "tasks", id), {
      completed: !currentStatus,
    });
    fetchTasks();
  };

  // Delete a task from Firestore
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Task Manager 📝</h1>

      {/* Task input form */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="w-full p-2 border rounded mb-2 bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Task list */}
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 border-b border-gray-700"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
                className="mr-2 accent-blue-500"
              />
              <span
                className={
                  task.completed ? "line-through text-gray-500" : "text-white"
                }
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-600 hover:bg-red-500 text-white p-1 px-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
