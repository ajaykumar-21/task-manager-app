"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import socket from "../lib/socket";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.on("refresh-tasks", fetchTasks);
    return () => socket.off("refresh-tasks", fetchTasks);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks from API:", err);
    }
  };

  const addTask = async (text) => {
    await addDoc(collection(db, "tasks"), { text, status: "todo" });
    fetchTasks();
    socket.emit("new-task");
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await deleteDoc(doc(db, "tasks", id));
    socket.emit("new-task");
  };

  const moveTask = async (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    await updateDoc(doc(db, "tasks", id), { status: newStatus });
    socket.emit("new-task");
  };

  return { tasks, addTask, deleteTask, moveTask };
}
