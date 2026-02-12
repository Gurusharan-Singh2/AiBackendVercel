import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user.js";
import InterviewRouter from "./routes/interview.js";
import ContactRouter from "./routes/contact.js";
import SubscriptionRouter from "./routes/subscription.js";
import AdminRouter from "./routes/admin.routes.js";
import ResumeRouter from "./routes/resume.js";

// ✅ Safe way to load JSON in Vercel
const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("./swagger-output.json", import.meta.url))
);

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

// Routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


// app.use("/api/v1", UserRouter);
// app.use("/api/v1/contact", ContactRouter);
// app.use("/api/v1/interview", InterviewRouter);
// app.use("/api/v1/subscription", SubscriptionRouter);
// app.use("/api/v1/admin", AdminRouter);
// app.use("/api/v1/resume", ResumeRouter);

// ❌ DO NOT use app.listen()
// ✅ Just export app
export default app;
