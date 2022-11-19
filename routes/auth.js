import express from "express";
import { signin, signup } from "../controllers/authController.js";
const router = express.Router();
console.log("get");
// singup a user
router.post("/signup", signup);
// singin a user
router.post("/signin", signin);
export default router;
