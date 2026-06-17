import express from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/add-user", addUser);
userRouter.patch("/users/:id", updateUser);
// userRouter.delete("/users/:id");

export default userRouter;
