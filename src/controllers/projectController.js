import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";
import client from "../config/redis.js";
import Task from "../models/Task.js";

const getAllProjects = asyncHandler(async (req, res) => {
  const cached = await client.get("projects");
  if (cached) {
    return res
      .status(200)
      .json({ success: true, fromCache: true, data: JSON.parse(cached) });
  }
  const projects = await Project.find({});

  await client.setEx("projects", 3600, JSON.stringify(projects));
  res.status(200).json({
    success: true,
    message: "Projects found succesfully",
    data: projects,
  });
});

const getProjectsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Project found by Id", data: project });
});

const postProjectById = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: "Error while Posting" });
  }
  await client.del("projects");

  res.status(201).json({ success: true, data: project });
});

const updateProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!project) {
    return res.status(404).json({ success: false, data: "Project not found" });
  }
  await client.del("projects");

  res.status(201).json({ success: true, data: project });
});

const deleteProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  await client.del("projects");
  res.status(200).json({ message: "Deleted succesfully" });
});

const getProjectStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const stats = await Task.aggregate([
    { $match: { projectId: new mongoose.Types.ObjectId(id) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
});

export {
  getAllProjects,
  postProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectsById,
  getProjectStats,
};
