import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    role: { enum: ["admin", "client", "pm"] },
  },

  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
