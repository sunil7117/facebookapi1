import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./config/connect.js";
import AuthRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
// const DATABASE_URL = "mongodb://localhost:27017" || process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);
connect(DATABASE_URL);
app.get("/", (req, res) => {
  res.send("Welcome to api");
});
// Routes Here
app.use(cookieParser());
app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
// Routes Here
app.listen(PORT, () => {
  console.log("server started..." + PORT);
});
