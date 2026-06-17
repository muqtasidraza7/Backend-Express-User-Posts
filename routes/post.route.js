import express from "express";
import {
  createPosts,
  getPosts,
  getPostsByUser,
} from "../controller/post.controller.js";

const postRouter = express.Router();

postRouter.get("/getPosts", getPosts);
postRouter.post("/add-post", createPosts);
postRouter.get("/users/:id/posts", getPostsByUser);

export default postRouter;
