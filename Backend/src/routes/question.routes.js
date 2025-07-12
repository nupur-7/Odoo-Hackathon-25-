import { Router } from "express";
import {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";

const questionRouter = Router();
questionRouter.post(
  "/",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  addQuestion
);
questionRouter.get("/", getAllQuestions);
questionRouter.get("/:id", getQuestionById);
questionRouter.put(
  "/:id",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  updateQuestion
);
questionRouter.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("USER", "ADMIN"),
  deleteQuestion
);

export default questionRouter;
