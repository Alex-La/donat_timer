import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { initSockets } from "./socket";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import localStrategy from "./passport/localStrategy";
import authRouter from "./routes/auth";

const PORT = process.env.PORT!!;
const SESSION_SECRET = process.env.SESSION_SECRET!!;

passport.serializeUser<any>((user, done) => done(null, user));
passport.deserializeUser<any>((user, done) => done(null, user));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: SESSION_SECRET, resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);

app.use("/auth", authRouter(passport));

function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect("/login");
  });
}

app.get("/home", (_, res) => {
  res.send("Home page. You're authorized.");
});

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

app.get("*", (_, res) => res.render("404"));

const server = createServer(app);
const io = new SocketServer(server);
initSockets(io);

server.listen(PORT, () => console.log(`Server ready at port: ${PORT}`));
