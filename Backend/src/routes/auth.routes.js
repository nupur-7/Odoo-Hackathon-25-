import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";
const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh-token", verifyJWT, refreshAccessToken);
authRouter.post(
  "/logout",
  verifyJWT,
  authorizeRoles("ADMIN", "USER"),
  logoutUser
);

export default authRouter;
