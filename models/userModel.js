import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 20,
      min: 3,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      require: true,
    },
    friendsRequest: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
