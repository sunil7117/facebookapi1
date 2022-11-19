import express from "express";
import { signin, signup, welcome } from "../controllers/authController.js";
const router = express.Router();
console.log("get");
// singup a user
router.get("/welcome", welcome);
router.post("/signup", signup);
// singin a user
router.post("/signin", signin);
export default router;
