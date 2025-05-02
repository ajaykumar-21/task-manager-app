const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manager-app-tau-livid.vercel.app",
  "https://task-manager-app-git-main-qkarts-projects.vercel.app", // optional
];

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("new-task", () => {
    socket.broadcast.emit("refresh-tasks");
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Socket server running on port ${PORT}`);
});
