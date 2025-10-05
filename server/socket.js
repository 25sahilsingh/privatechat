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
  console.log("usermailfrom => ", socket.handshake.query.loggeduser);
  console.log("a user connected", socket.id);
  binder[socket.handshake.query.loggeduser] = socket.id;
  socket.on("messagefromclient", ({ mailfrom, mailto, id, message }) => {
    socket.to(binder[mailto]).emit("messagefrombackend", message);
  });
});
