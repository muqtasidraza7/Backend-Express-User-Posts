import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(postRouter);
app.use(authRouter)

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
