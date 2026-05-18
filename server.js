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
  const binder = {};
  io.on("connection", (socket) => {
    binder[socket.handshake.query.loggeduser] = socket.id;
    io.emit("onlineuser", { onlineusers: binder });

    socket.on("messagefromclient", ({ mailfrom, mailto, message }) => {
      if (binder[mailto]) {
        io.to(binder[mailto]).emit("messagefrombackend", {
          mailFrom: mailfrom,
          mailTo: mailto,
          message,
        });
      }
      io.to(binder[mailfrom]).emit("messagefrombackend", {
        mailFrom: mailfrom,
        mailTo: mailto,
        message,
      });
    });

    socket.on("disconnect", () => {
      for (let key in binder) {
        if (binder[key] === socket.id) {
          delete binder[key];
        }
      }
      io.emit("onlineuser", { onlineusers: binder });
    });
  });
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
