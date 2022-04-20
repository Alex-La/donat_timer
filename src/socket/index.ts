import { Server } from "socket.io";

export const initSockets = (io: Server) => {
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
};
