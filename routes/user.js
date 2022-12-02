import express from "express";
import {
  friendRequest,
  getAlluser,
  friendAdd,
  requestList,
  postUser,
} from "../controllers/userController.js";
const router = express.Router();

// get all users list for friends list
router.post("/", getAlluser);

// send friend request to a user
router.post("/send", friendRequest);
// GET A POSTED USER
router.get("/:postUserId", postUser);
// get friend request list
router.post("/requestlist", requestList);

// send friend request accept
router.put("/accept", friendAdd);
export default router;
