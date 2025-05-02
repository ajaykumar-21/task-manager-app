"use client";

export const dynamic = "force-dynamic";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "@/components/TaskForm";
import TaskColumn from "@/components/TaskColumn";
import useTasks from "../hooks/useTasks";

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
