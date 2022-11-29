import express from "express";
import { createPost, getmyposts } from "../controllers/postController.js";
const router = express.Router();
// create a post
router.post("/create", createPost);
router.get("/profile/:id", getmyposts);
export default router;
