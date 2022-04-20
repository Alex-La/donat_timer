import { Router } from "express";
import { PassportStatic } from "passport";

const authRouter = (passport: PassportStatic): Router => {
  const router = Router();

  router.get("/login", (req, res) => {
    res.render("auth/login", { error: req.flash("error")[0] });
  });

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })
  );

  return router;
};

export default authRouter;
