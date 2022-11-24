import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const welcome = (req, res) => {
  res.send("welcome in auth system");
};
export const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    // const user = await UserModel.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    !isMatched && res.status(404).json("email / password is wrong");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECERET_KEY);
    const { password, ...other } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    console.log(err);
  }
};
export const signup = async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserModel({ ...req.body, password: hash });
    console.log(newUser);
    console.log("newUser");
    const saveUser = await newUser.save();
    console.log(saveUser);
    const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECERET_KEY);
    const { password, ...other } = saveUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};
