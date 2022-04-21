import { Router } from "express";

const ownerRouter = (): Router => {
  const router = Router();

  router.get("/panel", (_, res) => {
    res.render("private/owner/panel");
  });

  return router;
};

export default ownerRouter;
