import React from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter a new task..."
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
        <ul className="mt-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between p-2 border-b">
              <span className={task.completed ? "line-through" : ""}>
                {task.text}
              </span>
              <button
                onClick={() => toggleTask(task.id)}
                className="text-green-500"
              >
                ✔
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
