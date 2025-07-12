import { Router } from "express";
import {
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";

const router = Router();
router.get("/", verifyJWT, authorizeRoles("Admin"), getUserNotifications);
router.patch(
  "/:id/mark-read",
  verifyJWT,
  authorizeRoles("Admin"),
  markNotificationAsRead
);

export default router;
