import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 300,
    },
    photo: { type: String },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);
const PostModel = mongoose.model("post", postSchema);
export default PostModel;
