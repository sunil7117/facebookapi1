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
  try {
    console.log(req.params.id);
    const currentUser = await UserModel.findById(req.params.id);
    const userPosts = await PostModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.friends.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {}
};
