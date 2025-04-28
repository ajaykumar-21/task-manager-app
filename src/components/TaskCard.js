import { Draggable } from "@hello-pangea/dnd";
import { X } from "lucide-react";

export default function TaskCard({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-between items-center p-4 mb-3 rounded-lg shadow-md transition-all duration-300 ease-in-out
        ${
          snapshot.isDragging
            ? "bg-blue-600 scale-105 shadow-lg"
            : "bg-gray-800 hover:bg-gray-700"
        }
      `}
        >
          <span
            className={`text-base font-medium transition-colors ${
              task.status === "completed"
                ? "line-through text-gray-400"
                : "text-white"
            }`}
          >
            {task.text}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </Draggable>
  );
}
