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
import socket from "../lib/socket";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
    socket.on("refresh-tasks", fetchTasks);
    return () => socket.off("refresh-tasks", fetchTasks);
  }, []);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksList);
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
