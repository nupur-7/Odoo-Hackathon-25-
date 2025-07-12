import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", verifyJWT, refreshAccessToken);
router.post("/logout", verifyJWT, logoutUser);

export default router;
