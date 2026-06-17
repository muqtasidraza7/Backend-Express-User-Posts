import express from "express";
import { createPosts, getPosts } from "../controller/post.controller.js";

const postRouter = express.Router();

postRouter.get("/getPosts", getPosts);
postRouter.post("/add-post", createPosts);

export default postRouter;
