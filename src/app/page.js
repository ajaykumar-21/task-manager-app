"use client";

import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
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
import TaskForm from "@/components/TaskForm";
import TaskColumn from "@/components/TaskColumn";

export default function Home() {
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

  const addTask = async () => {
    if (!newTask.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text: newTask,
      status: "todo",
    });
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

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    moveTask(draggableId, destination.droppableId);
  };

  const statusLabels = {
    todo: "To Do",
    inprogress: "In Process",
    completed: "Completed",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
        Task Manager 📝
      </h1>
      <TaskForm onAdd={addTask} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {Object.entries(statusLabels).map(([statusKey, label]) => (
            <TaskColumn
              key={statusKey}
              statusKey={statusKey}
              label={label}
              tasks={tasks.filter((task) => task.status === statusKey)}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
