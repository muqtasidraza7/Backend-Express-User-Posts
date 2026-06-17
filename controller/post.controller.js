import { postSchema } from "../schemas/post.schema.js";
import { Post } from "../models/post.model.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { User } from "../models/user.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().skip().limit();
    const totalPosts = await Post.countDocuments();
    if (!posts) {
      return errorResponse(res, 400, "Could not find any Posts");
    }
    return successResponse(res, 200, {
      posts,
      pagination: {
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        limit,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, "Unable to find users");
    console.log(error);
  }
};

export const createPosts = async (req, res, next) => {
  try {
    const data = postSchema.safeParse(req.body);
    if (!data.success) {
      return errorResponse(res, 400, "Post data is not valid");
    }
    const newPost = new Post(data.data);
    await newPost.save();
    return successResponse(res, 201, newPost);
  } catch (error) {
    return errorResponse(res, 500, "Post has not been created");
  }
};

export const getPostsByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const posts = await Post.find({ userId: req.params.id }).populate(
      "userId",
      "name email",
    );

    return successResponse(res, 200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      totalPosts: posts.length,
      posts,
    });
  } catch (error) {
    return errorResponse(res, 500, error?.message || "Could not fetch posts");
  }
};
