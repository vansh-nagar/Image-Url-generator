import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";
import userRouter from "./routers/user.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" })); // configure json so that data can come in json || limit to prevent spam
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //configure data coming from url - make it good like vansh nagar will be - vansh+nagar ||
//extended means multiple level of objects can come || limit to prevent spam etc
app.use(express.static("public")); // tell express static files are present in public so that we don't neet to write ../public/---/--- insted /---/---
app.use(cookieParser());

dotenv.config({
  path: "./.env",
});

connectDB();

app.get("/", userRouter);

app.listen(process.env.PORT);
