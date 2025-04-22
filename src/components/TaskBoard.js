import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";
import socket from "../lib/socket";

const initialTasks = {
  todo: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
  ],
  inProgress: [],
  done: [],
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    socket.on("task-updated", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("task-updated");
    };
  }, []);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const updatedTasks = { ...tasks };
    const sourceColumn = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === active.id)
    );
    const destinationColumn = over.data.current?.column;

    if (sourceColumn && destinationColumn) {
      const sourceTasks = [...tasks[sourceColumn]];
      const destTasks = [...tasks[destinationColumn]];
      const movedTask = sourceTasks.find((task) => task.id === active.id);
      if (!movedTask) return;

      updatedTasks[sourceColumn] = sourceTasks.filter(
        (task) => task.id !== active.id
      );
      updatedTasks[destinationColumn] = [...destTasks, movedTask];

      setTasks(updatedTasks);
      socket.emit("update-task", updatedTasks);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(tasks).map(([column, taskList]) => (
          <SortableContext
            key={column}
            items={taskList.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-4 border rounded-lg bg-gray-100">
              <h2 className="text-lg font-bold">{column.toUpperCase()}</h2>
              {taskList.map((task) => (
                <DraggableTask key={task.id} task={task} column={column} />
              ))}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
