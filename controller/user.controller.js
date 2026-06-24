import { userSchema } from "../schemas/user.schema.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    successResponse(res, 200, {
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        limit,
      },
    });
  } catch (error) {
    errorResponse(res, 500, "Unable to find users");
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, user);
  } catch (error) {
    return errorResponse(res, 500, "Error while fetching a single user");
  }
};

export const addUser = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);
    const data = userSchema.safeParse(req.body);
    if (!data.success) {
      return errorResponse(res, 400, "User data is not valid");
    }

    const newUser = new User(data.data);
    await newUser.save();
    return successResponse(res, 201, newUser);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 409, "Email already exists");
    }
    return errorResponse(res, 500, "User has not been created");
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = userSchema.partial().safeParse(req.body);

    if (!data.success) {
      return errorResponse(
        res,
        400,
        "The data to validate User is not correct",
      );
    }

    if (Object.keys(data.data).length == 0) {
      return errorResponse(res, 400, "No data is provided to update");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: data.data },
      { new: true },
    );

    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, updatedUser);
  } catch (error) {
    if (error.code === 11000) {
      return errorResponse(res, 409, "Email already exists");
    }
    return errorResponse(res, 500, "User failed to get updated");
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, 404, "User does not exist");
    }

    await Post.deleteMany({ userId: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    return res.status(204).send();
  } catch (error) {
    return errorResponse(res, 500, "Could not delete user");
  }
};
