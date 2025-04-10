// import { useState, useEffect } from "react";
// import { db, auth } from "../components/firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import ProtectedRoute from "../components/ProtectedRoute";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Fetch tasks from Firestore
//   const fetchTasks = async () => {
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     const tasksList = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setTasks(tasksList);
//   };

//   // Add a new task to Firestore
//   const addTask = async () => {
//     if (!newTask) return;
//     const user = auth.currentUser;
//     if (!user) return;

//     await addDoc(collection(db, "tasks"), {
//       text: newTask,
//       completed: false,
//       userId: user.uid,
//     });
//     setNewTask("");
//     fetchTasks();
//   };

//   // Delete a task from Firestore
//   const deleteTask = async (taskId) => {
//     await deleteDoc(doc(db, "tasks", taskId));
//     fetchTasks();
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Enter new task"
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={addTask}
//               className="w-full bg-blue-500 text-white p-2 rounded"
//             >
//               Add Task
//             </button>
//           </div>
//           <ul>
//             {tasks.map((task) => (
//               <li
//                 key={task.id}
//                 className="flex justify-between items-center p-2 border-b"
//               >
//                 <span>{task.text}</span>
//                 <button
//                   onClick={() => deleteTask(task.id)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
