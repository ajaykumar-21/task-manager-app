const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(4000, () =>
  console.log("Server running on port 4000")
);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("update-task", (task) => {
    io.emit("task-updated", task);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});
