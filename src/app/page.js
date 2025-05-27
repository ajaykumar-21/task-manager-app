"use client";

export const dynamic = "force-dynamic";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "@/components/TaskForm";
import TaskColumn from "@/components/TaskColumn";
import useTasks from "../hooks/useTasks";
import Register from "@/components/Register";
import Login from "@/components/Login";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { tasks, addTask, deleteTask, moveTask } = useTasks();
  const { user, loading } = useAuth();

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

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    // If not logged in, show Register and Login side by side
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Task Manager 📝
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Register />
          <Login />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-400">
            Task Manager 📝
          </h1>
          <LogoutButton />
        </div>

        <TaskForm onAdd={addTask} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
