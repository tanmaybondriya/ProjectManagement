import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    files: [
      {
        filename: { type: String },
        path: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },
  },
  { timestamps: true },
);
taskSchema.index({ status: 1, priority: 1 });
const Task = mongoose.model("Task", taskSchema);
export default Task;
