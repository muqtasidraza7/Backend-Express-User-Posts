import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    age: { type: Number },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
