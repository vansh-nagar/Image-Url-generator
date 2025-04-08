import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  links: [{ type: String }],
});

export const User = mongoose.model("User", userSchema);
