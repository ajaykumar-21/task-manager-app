import { Draggable } from "@hello-pangea/dnd";
import { X } from "lucide-react";

export default function TaskCard({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="transition-all duration-300 ease-in-out flex justify-between items-center p-2 mb-2 bg-gray-700 rounded"
        >
          <span
            className={
              task.status === "completed"
                ? "line-through text-gray-400"
                : "text-white"
            }
          >
            {task.text}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-400"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </Draggable>
  );
}
