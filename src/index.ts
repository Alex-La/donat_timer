import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { initSockets } from "./socket";

const port = process.env.PORT;

const app = express();

app.set("views", path.join(__dirname, "views"));
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
initSockets(io);

server.listen(port, () => console.log(`Server ready at port: ${port}`));
