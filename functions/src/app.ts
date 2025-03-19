import express from "express";
import cors from "cors";
//
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para CORS y JSON
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;
