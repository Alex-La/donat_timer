import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";

const port = process.env.PORT;

const app = express();

app.set("views", path.join("views"));
app.set("view engine", "pug");

app.get("/", (_, res) => {
  res.render("index", { title: "Timer" });
});

app.get("/settings", (_, res) => {
  res.render("settings", { title: "Settings" });
});

app.get("/theme", (_, res) => {
  res.render("theme", { title: "Theme" });
});

const server = createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  socket.join("room");

  socket.on("start", (time) => {
    io.to("room").emit("start", time * 1000);
  });

  socket.on("increase", (time) => {
    io.to("room").emit("increase", time * 1000);
  });

  socket.on("decrease", (time) => {
    io.to("room").emit("decrease", time * 1000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(port, () => console.log(`Server ready at port: ${port}`));
