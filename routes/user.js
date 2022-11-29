import express from "express";
import { getAlluser } from "../controllers/userController.js";
const router = express.Router();
// create a post
router.get("/", getAlluser);
export default router;
