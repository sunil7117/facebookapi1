import express from "express";
import { signin, signup, verify } from "../controllers/authController.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
router.post("/signup", signup);
// singin a user
router.post("/signin", signin);
// verify password
router.put("/update/:currentUserId", verifyToken, verify);
export default router;
