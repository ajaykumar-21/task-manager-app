import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function TaskColumn({ statusKey, label, tasks, onDelete }) {
  return (
    <Droppable droppableId={statusKey}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-800 rounded-lg p-4 min-h-[300px]"
        >
          <h2 className="text-xl font-semibold mb-4">{label}</h2>
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
