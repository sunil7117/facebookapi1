import UserModel from "../models/userModel.js";
// get all users list for friends list
export const getAlluser = async (req, res) => {
  try {
    let users = await UserModel.find();
    const obj = req.body.id;
    console.log("id is" + obj);
    let fuser = users.filter((user) => {
      return user._id.toString() !== obj;
    });
    res.status(200).json(fuser);
  } catch (err) {
    console.log(err);
  }
};

// send friend request to a user
export const friendRequest = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.id);
    if (!user.friendsRequest.includes(req.body.currentId)) {
      await user.updateOne({ $push: { friendsRequest: req.body.currentId } });
      console.log("ok");
      res.status(200).json("friend request send");
    } else {
      await user.updateOne({ $pull: { friendsRequest: req.body.currentId } });
      console.log("bye");
      res.status(200).json("friend request cancelled");
    }
  } catch (error) {
    console.log(error);
  }
};
export const requestList = async (req, res) => {
  try {
    const udpdateUser = await UserModel.findById(req.body.id);
    res.status(200).json(udpdateUser);
  } catch (err) {
    console.log(err);
  }
};

// send friend request accept
export const friendAdd = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.body.currentId); //8030 bbb
    const user = await UserModel.findById(req.body.requestedId); //802e aaa
    if (!currentUser.friends.includes(req.body.requestedId)) {
      await currentUser.updateOne({
        $pull: { friendsRequest: req.body.requestedId },
      });
      await currentUser.updateOne({ $push: { friends: req.body.requestedId } });
      await user.updateOne({ $push: { friends: req.body.currentId } });
      res.status(200).json("Friend request acceted");
    } else {
      await currentUser.updateOne({ $pull: { friends: req.body.requestedId } });
      await user.updateOne({ $pull: { friends: req.body.currentId } });
      res.status(200).json("Friend request cancelled");
    }
  } catch (error) {}
};
