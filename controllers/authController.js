import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  console.log(req.body);
  try {
    // const users = await UserModel.findOne({
    //   $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    // });
    const users = await UserModel.findOne({ email: req.body.email });
    console.log(users);
    !users && res.status(404).json("user not found");
    const isMatched = await bcrypt.compare(req.body.password, users.password);
    console.log(isMatched);
    !isMatched && res.status(404).json("email / password is wrong");
    const token = jwt.sign({ id: users._id }, process.env.JWT_SECERET_KEY);
    const { password, ...other } = users._doc;
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

    const saveUser = await newUser.save();
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
export const verify = async (req, res) => {
  if (req.params.currentUserId === req.user.id) {
    if (req.body.password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);
      await UserModel.findByIdAndUpdate(req.params.currentUserId, {
        $set: { password: hash },
      });
      res.status(200).json("password changed");
    } else {
      try {
        const update = await UserModel.findByIdAndUpdate(
          req.params.currentUserId,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(update);
      } catch (error) {}
    }
  } else {
    res.status(403).json("you can update only your account");
  }
};
