import { getUser } from "../controller/Userc.js";
import express from "express";

const userRouter = express.Router();

userRouter.route("/").get(getUser);

export default userRouter;
