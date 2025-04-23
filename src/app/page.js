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
import { X } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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
    setNewTask("");
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

      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={addTask}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {Object.keys(statusLabels).map((statusKey) => (
            <Droppable droppableId={statusKey} key={statusKey}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-800 rounded-lg p-4 min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {statusLabels[statusKey]}
                  </h2>
                  {tasks
                    .filter((task) => task.status === statusKey)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="transition-all duration-300 ease-in-out flex justify-between items-center p-2 mb-2 bg-gray-700 rounded"
                          >
                            <span
                              className={
                                statusKey === "completed"
                                  ? "line-through text-gray-400"
                                  : "text-white"
                              }
                            >
                              {task.text}
                            </span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
