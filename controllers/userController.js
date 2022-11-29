import UserModel from "../models/userModel.js";
export const getAlluser = async (req, res) => {
  console.log("sunil");
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
