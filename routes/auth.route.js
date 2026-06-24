import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", protect, (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, 400, "User is not authenticated");
  }
  const { name, email, age } = req.user;
  return successResponse(res, 200, {
    name,
    email,
    age,
  });
});

export default authRouter;
