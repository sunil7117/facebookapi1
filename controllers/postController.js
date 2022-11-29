import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
export const createPost = async (req, res) => {
  console.log("sunil");
  try {
    const newPost = new PostModel(req.body);
    const savePost = await newPost.save();
    res.send(savePost);
  } catch (err) {
    console.log(err);
  }
};
export const getmyposts = async (req, res) => {
  console.log(req.params.id);
  try {
    const currentUser = await UserModel.findById(req.params.id);
    console.log(currentUser);
    const posts = await PostModel.find({ userId: currentUser._id });
    res.send(posts);
  } catch (error) {}
};
