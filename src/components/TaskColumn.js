import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ statusKey, label, tasks, onDelete }) {
  return (
    <Droppable droppableId={statusKey}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-xl p-5 min-h-[300px] transition-all duration-300
        ${
          snapshot.isDraggingOver
            ? "bg-blue-700/50"
            : "bg-gray-900 hover:bg-gray-800"
        }
        shadow-md`}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">{label}</h2>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
