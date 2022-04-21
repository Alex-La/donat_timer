//@ts-nocheck
import UserEntity from "../models/entities/UserEntity";
import { SoketServer } from "./types";

export const initSockets = (io: SoketServer) => {
  io.on("connection", (socket) => {
    const user = socket.request.session.passport.user as UserEntity;

    socket.join(user.id);

    socket.on("start", (time) => {
      io.to(user.id).emit("start", time * 1000);
    });

    socket.on("increase", (time) => {
      io.to(user.id).emit("increase", time * 1000);
    });

    socket.on("decrease", (time) => {
      io.to(user.id).emit("decrease", time * 1000);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });
  });
};
