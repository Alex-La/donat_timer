import { RequestHandler } from "express";

const isAuth: RequestHandler = (req, res, next) => {
  if (req.user) next();
  else res.redirect("/auth/login");
};

export default isAuth;
