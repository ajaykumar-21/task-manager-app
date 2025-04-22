import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
// socket.on("task-updated", (task) => console.log("Task Updated: ", task));

export default socket;
