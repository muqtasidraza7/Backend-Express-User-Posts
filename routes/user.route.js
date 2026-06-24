import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { errorResponse, successResponse } from "../utils/response.js";
const userRouter = express.Router();

userRouter.get("/users", protect, getAllUsers);
userRouter.get("/users/:id", protect, getUserById);
userRouter.post("/add-user", protect, addUser);
userRouter.patch("/users/:id", protect, updateUser);
userRouter.delete("/users/:id", protect, deleteUser);

export default userRouter;
