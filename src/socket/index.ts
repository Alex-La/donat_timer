//@ts-nocheck

import { Server } from "socket.io";
import UserEntity from "../models/entities/UserEntity";

export const initSockets = (io: Server) => {
  io.on("connection", (socket) => {
    const user = socket.request.session.passport.user as UserEntity;

    socket.join(user.id);

    const lastTimerDateTime = socket.request.session.lastTimerDateTime;
    if (lastTimerDateTime)
      io.to(user.id).emit("lastTimerDateTime", lastTimerDateTime);

    socket.on("start", (time) => {
      io.to(user.id).emit("start", time * 1000);
    });

    socket.on("increase", (time) => {
      io.to(user.id).emit("increase", time * 1000);
    });

    socket.on("decrease", (time) => {
      io.to(user.id).emit("decrease", time * 1000);
    });

    socket.on("disconnection", (date) => {
      socket.request.session.lastTimerDateTime = date;
      socket.request.session.save();
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });
  });
};
