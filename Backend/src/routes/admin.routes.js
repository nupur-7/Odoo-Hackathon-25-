import { Router } from "express";
import { readAllUsers, deleteUser } from "../controllers/admin.controller.js";
import { authorizeRoles } from "../middlewares/roles.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const adminRouter = Router();
adminRouter.get("/users", verifyJWT, authorizeRoles("Admin"), readAllUsers);
adminRouter.delete(
  "/users/:id",
  verifyJWT,
  authorizeRoles("Admin"),
  deleteUser
);
export default adminRouter;
