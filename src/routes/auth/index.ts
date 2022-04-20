import { Router } from "express";
import { PassportStatic } from "passport";

const authRouter = (passport: PassportStatic): Router => {
  const router = Router();

  router.get("/", (_, res) => res.redirect("/auth/login"));

  router.get("/login", (req, res) => {
    const error = req.flash("error")[0];
    res.render("auth/login", { error });
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })
  );

  return router;
};

export default authRouter;
