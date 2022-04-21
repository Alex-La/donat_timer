import session from "express-session";

const SESSION_SECRET = process.env.SESSION_SECRET!!;
const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE!!, 10);
const isProd = process.env.NODE_ENV === "production";

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: isProd, maxAge: COOKIE_MAX_AGE * 1000 },
});

export default sessionMiddleware;
