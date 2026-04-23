import { Router } from "express";
import {
  getAllProjects,
  postProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectsById,
  getProjectStats,
} from "../controllers/projectController.js";
const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectsById);
router.post("/", postProjectById);
router.put("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);
router.get("/:id/stats", getProjectStats);
export default router;
