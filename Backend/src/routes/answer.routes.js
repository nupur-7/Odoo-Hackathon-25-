import { Router } from "express";
import {
  addAnswer,
  getAnswersByQuestion,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";

const answerRouter = Router();
answerRouter.post("/", verifyJWT, authorizeRoles("USER", "ADMIN"), addAnswer);
answerRouter.get("/question/:questionId", getAnswersByQuestion);
answerRouter.get("/:id", getAnswerById);
answerRouter.put(
  "/:id",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  updateAnswer
);
answerRouter.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  deleteAnswer
);

export default answerRouter;
