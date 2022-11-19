import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      max: 20,
      unique: true,
    },
    mobile: {
      type: String,
      max: 15,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 20,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
