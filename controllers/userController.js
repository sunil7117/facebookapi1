import UserModel from "../models/userModel.js";
export const getAlluser = async (req, res) => {
  try {
    const users = await UserModel.find();
    const obj = req.body.id;
    const data = users.filter((user) => {
      console.log(user._id.toString());
      return user._id.toString() !== obj;
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
export const friendRequest = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.body.currentId);
    const user = await UserModel.findById(req.body.id);
    if (!user.friendsRequest.includes(req.body.currentId)) {
      await user.updateOne({ $push: { friendsRequest: req.body.currentId } });
      res.status(200).json({ msg: "Friend request sent", data: currentUser });
    } else {
      await user.updateOne({ $pull: { friendsRequest: req.body.currentId } });
      res.status(200).json("Friend request cancelled");
    }
  } catch (error) {}
};
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
