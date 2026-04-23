import { Router } from "express";
import userRouter from "./userRoutes.js";
import projectRouter from "./projectRoutes.js";
import taskRouter from "./taskRoutes.js";
import authRouter from "./authRoutes.js";

const v1Router = Router();

v1Router.use("/users", userRouter);
v1Router.use("/project", projectRouter);
v1Router.use("/tasks", taskRouter);
v1Router.use("/auth", authRouter);
export default v1Router;
