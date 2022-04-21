import { RequestHandler } from "express";
import UserEntity, { UserRoleEnum } from "../../models/entities/UserEntity";

export const isAuth: RequestHandler = (req, res, next) => {
  if (req.user) next();
  else res.redirect("/auth/login");
};

export const isOwner: RequestHandler = (req, res, next) => {
  const user = req.user as UserEntity;
  if (user && user.role === UserRoleEnum.OWNER) next();
  else res.render("404");
};
