import express from "express";
import {
  friendRequest,
  getAlluser,
  friendAdd,
} from "../controllers/userController.js";
const router = express.Router();
// get all users
router.get("/", getAlluser);
// send friend request
router.put("/send", friendRequest);
router.put("/accept", friendAdd);
export default router;
