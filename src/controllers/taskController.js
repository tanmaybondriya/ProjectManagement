// taskController.js
import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllTask = asyncHandler(async (req, res) => {
  const { status, priority, projectId } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (projectId) filter.projectId = projectId;
  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .populate("projectId", "projectName status");

  res.status(200).json({ success: true, data: tasks });
});

export const getTasksById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json({ success: true, data: task });
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, data: task });
});

export const updateTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json({ success: true, data: task });
});

export const deleteTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});



