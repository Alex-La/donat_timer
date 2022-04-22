import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { initSockets } from "./socket";
import flash from "connect-flash";
import passport from "passport";
import localStrategy from "./utils/passport/localStrategy";
import authRouter from "./routes/auth";
import { isAuth } from "./utils/middleware/auth";
import privateRouter from "./routes/private";
import { DataSource } from "typeorm";
import ormOptions from "./utils/ormOptions";
import Store from "./utils/store";
import sessionMiddleware from "./utils/middleware/session";
import UserEntity from "./models/entities/UserEntity";
import { isAuthIO, wrap } from "./utils/middleware/socket";

const PORT = process.env.PORT!!;
const DATABASE_URL = process.env.DATABASE_URL!!;
const IS_PROD = process.env.NODE_ENV === "production";

passport.serializeUser<UserEntity>((user, done) =>
  done(null, user as UserEntity)
);
passport.deserializeUser<UserEntity>((user, done) => done(null, user));

const dataSource = new DataSource(ormOptions(DATABASE_URL));

console.info("Data source init start...");
dataSource
  .initialize()
  .then((ds) => {
    const store = Store(ds);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(sessionMiddleware);
    if (IS_PROD) app.set("trust proxy", 1);
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(localStrategy(store));

    app.use(express.static(path.join("src", "public")));
    app.set("views", path.join("src", "views"));
    app.set("view engine", "pug");

    app.use("/auth", authRouter(passport));
    app.use(isAuth, privateRouter());

    app.get("*", (_, res) => res.render("404"));

    const server = createServer(app);
    const io = new SocketServer(server);

    io.use(wrap(sessionMiddleware));
    io.use(isAuthIO);

    initSockets(io);

    server.listen(PORT, () => console.log(`Server ready at port: ${PORT}`));
  })
  .catch((err) => {
    console.error("Orm error:", err);
    process.exit(1);
  });
