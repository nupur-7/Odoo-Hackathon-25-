import { Router } from "express";
import adminRouter from "./admin.routes.js";
import questionRouter from "./question.routes.js";
import answerRouter from "./answer.routes.js";
import voteRouter from "./vote.routes.js";
import authRouter from "./auth.routes.js";
import notificationRouter from "./notification.routes.js";

const rootRouter = Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/questions", questionRouter);
rootRouter.use("/answers", answerRouter);
rootRouter.use("/votes", voteRouter);
rootRouter.use("/notifications", notificationRouter);

export default rootRouter;
