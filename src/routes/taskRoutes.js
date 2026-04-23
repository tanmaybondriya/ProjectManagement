import { Router } from "express";
import {
  getAllTask,
  getTasksById,
  updateTaskById,
  deleteTaskById,
  createTask,
} from "../controllers/taskController.js";
const router = Router();

router.get("/", getAllTask);
router.get("/:id", getTasksById);
router.put("/:id", updateTaskById);
router.post("/", createTask);
router.delete("/:id", deleteTaskById);
export default router;
