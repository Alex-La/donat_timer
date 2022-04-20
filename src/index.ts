import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { initSockets } from "./socket";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const PORT = process.env.PORT!!;
const SESSION_SECRET = process.env.SESSION_SECRET!!;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: SESSION_SECRET, resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((user, password, done) => {
    if (user !== "test_user")
      return done(null, false, {
        message: "User not found",
      });
    else if (password !== "test_password")
      return done(null, false, {
        message: "Wrong password",
      });

    return done(null, { id: 1, name: "Test", age: 21 });
  })
);

app.get("/login", (_, res) => {
  res.send("Login page. Please, authorize.");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

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
