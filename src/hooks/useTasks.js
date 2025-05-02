"use client";

import { useState, useEffect } from "react";
import socket from "../lib/socket";
import axios from "axios";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();

    const refresh = () => {
      console.log("📡 Refresh event triggered");
      fetchTasks();
    };

    socket.on("refresh-tasks", refresh);

    return () => {
      socket.off("refresh-tasks", refresh);
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      console.log("📝 Fetched tasks:", data);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async (text) => {
    try {
      console.log("🚀 Sending task:", text);
      const res = await axios.post(`${window.location.origin}/api/tasks`, {
        text,
      });
      if (res.status === 201) {
        await fetchTasks(); // ensure we re-fetch from DB
        socket.emit("new-task");
      }
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const deleteTask = async (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await axios.delete(`/api/tasks/${id}`);
      socket.emit("new-task");
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const moveTask = async (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    try {
      await axios.patch(`/api/tasks/${id}`, { status: newStatus });
      socket.emit("new-task");
    } catch (err) {
      console.error("Failed to move task:", err);
    }
  };

  return { tasks, addTask, deleteTask, moveTask };
}
