import express from "express";
import {
  friendRequest,
  getAlluser,
  friendAdd,
  user,
} from "../controllers/userController.js";
const router = express.Router();
// get all users
router.get("/", getAlluser);
router.get("/", user);
// send friend request
router.put("/send", friendRequest);
router.put("/accept", friendAdd);
export default router;
