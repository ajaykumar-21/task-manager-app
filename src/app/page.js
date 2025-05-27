"use client";

export const dynamic = "force-dynamic";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "@/components/TaskForm";
import TaskColumn from "@/components/TaskColumn";
import useTasks from "../hooks/useTasks";
import Register from "@/components/Register";

export default function Home() {
  const { tasks, addTask, deleteTask, moveTask } = useTasks();

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
      <div className="max-w-6xl mx-auto">
        {/* App Title */}
        <h1 className="text-4xl font-extrabold text-blue-400 text-center mb-8">
          Task Manager 📝
        </h1>

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm onAdd={addTask} />
        </div>

        {/* Task Columns */}
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

        {/* Divider */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Registration Section */}
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
            Create Your Account
          </h2>
          <Register />
        </div>
      </div>
    </div>
  );
}
