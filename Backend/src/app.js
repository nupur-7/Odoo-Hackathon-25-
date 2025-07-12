import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Specify the allowed origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allows cookies to be sent with requests
  })
);

app.use("api/v1/", rootRouter);
export { app };
