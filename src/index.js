import express from "express";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.js";
import InterviewRouter from "./routes/interview.js";
import ContactRouter from "./routes/contact.js";
import SubscriptionRouter from "./routes/subscription.js";
import AdminRouter from "./routes/admin.routes.js";
import ResumeRouter from "./routes/resume.js";



const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Server Running Good",
  });
});
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "AI Backend is running 🚀",
  });
});


app.use("/api/v1", UserRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/interview", InterviewRouter);
app.use("/api/v1/subscription", SubscriptionRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/resume", ResumeRouter);
app.post("/api/v1/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Logged out successfully" });
});


export default app;

// app.listen(8080, () => {
//   console.log('Server Started');

// })
