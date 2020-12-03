import express from "express";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.get("/api/users/current-user", (req, res, next) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
