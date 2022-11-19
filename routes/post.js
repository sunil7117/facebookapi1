import express from "express";
import { createPost, getmyposts } from "../controllers/postController.js";
const router = express.Router();
// create a post
router.post("/", createPost);
router.get("/profile/:username", getmyposts);
export default router;
