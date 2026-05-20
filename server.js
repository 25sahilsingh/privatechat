import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const PORT = parseInt(process.env.PORT || "10000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const emitOnlineUsers = () => {
    const onlineUsers = [];

    for (const room of io.sockets.adapter.rooms.keys()) {
      if (!io.sockets.sockets.has(room)) {
        onlineUsers.push(room);
      }
    }

    io.emit("onlineuser", { onlineUsers });
  };

  io.on("connection", (socket) => {
    const userEmail = socket.handshake.query.loggeduser;
    console.log("Socket connected:", socket.id, userEmail);
    socket.join(userEmail);
    emitOnlineUsers();
    socket.on("messagefromclient", ({ mailfrom, mailto, message }) => {
      const payload = {
        mailFrom: mailfrom,
        mailTo: mailto,
        message,
      };

      io.to(mailto).emit("messagefrombackend", payload);
      io.to(mailfrom).emit("messagefrombackend", payload);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      emitOnlineUsers();
    });
  });

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
