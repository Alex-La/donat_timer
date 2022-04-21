import { Router } from "express";
import { isOwner } from "../../utils/middleware/auth";
import ownerRouter from "./owner";

const privateRouter = (): Router => {
  const router = Router();

  router.get("/home", (_, res) => {
    res.send("Home page. You're authorized.");
  });

  router.get("/", (_, res) => {
    res.render("index", { title: "Timer" });
  });

  router.get("/settings", (_, res) => {
    res.render("settings", { title: "Settings" });
  });

  router.use("/owner", isOwner, ownerRouter());

  return router;
};

export default privateRouter;
