import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from "node:http";

const rooms: Record<string, { id: string; username: string }[]> = {};

const httpServer = new HTTPServer();

const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("join-room", ({ room, username }) => {
    if (!room || !username) {
      socket.emit("error", "Room and username are required.");
      return;
    }

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push({ id: socket.id, username });

    socket.join(room);
    io.to(room).emit("user_list", rooms[room].map((user) => user.username));
    socket.to(room).emit("user_joined", `${username} joined the room`);
  });

  socket.on("message", ({ message, room, sender }) => {
    if (!message.trim()) {
      socket.emit("error", "Message cannot be empty.");
      return;
    }
    io.to(room).emit("message", { sender, message });
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
      io.to(room).emit("user_list", rooms[room].map((user) => user.username));
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");
    res.socket.server.io = io;
    httpServer.listen(3000);
  }
  res.end();
}
