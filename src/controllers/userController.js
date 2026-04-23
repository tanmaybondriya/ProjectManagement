// userController.js
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ success: true, data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ success: true, data: user });
});

export const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select(
    "-password",
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ success: true, data: user });
});

export const deleteUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
