import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import feedbackRoutes from "./routes/feedback.routes";
import cors from "cors";
import jobRoutes from "./routes/job.routes";
import { verifyTransporter } from "./mailer";
dotenv.config();

const createApp = (): Application => {
  const app = express();
  app.use(cors());

  app.use(express.json());
  app.use("/api/user", userRoutes);
  app.use("/api/feedback", feedbackRoutes);
  app.use("/api/job", jobRoutes);
  return app;
};

const startServer = (app: Application, port: string) => {
  app.listen(port, () => {
    console.log("Server is listening at", port);
  });
};

const initServer = () => {
  const port = process.env.PORT || "3000";
  const app = createApp();
  startServer(app, port);
  verifyTransporter();
};

initServer();
