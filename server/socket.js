import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.static("public"));
const expressServer = app.listen(5000, "0.0.0.0", () => {
  console.log("server is up and running");
});
const io = new Server(expressServer, {
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
    io.to(binder[mailto]).emit("messagefrombackend", {
      mailFrom: mailfrom,
      mailTo: mailto,
      message,
    });
    io.to(binder[mailfrom]).emit("messagefrombackend", {
      mailFrom: mailfrom,
      mailTo: mailto,
      message,
    });
  });
  socket.on("disconnect", () => {
    for (let key in binder) {
      if (binder[key] == socket.id) {
        delete binder[key];
      }
    }
    io.emit("onlineuser", { onlineusers: binder });
  });
});
