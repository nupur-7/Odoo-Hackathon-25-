import { Router } from "express";
import {
  voteOnAnswer,
  acceptAnswer,
  getAnswerVotes,
} from "../controllers/vote.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";

const router = Router();
router.post("/", verifyJWT, authorizeRoles("USER", "ADMIN"), voteOnAnswer);
router.post(
  "/answers/:id/accept",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  acceptAnswer
);
router.get("/answers/:id/votes", getAnswerVotes);

export default router;
