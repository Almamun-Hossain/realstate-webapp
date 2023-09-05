import express from "express";
import { createNewUser, deleteUser, getUserById, getUsers, updateExistUser } from "../controllers/user.controller";
const router = express.Router();

router.route("/users").get(getUsers).post(createNewUser);

router.route("/user/:userId").get(getUserById).put(updateExistUser).delete(deleteUser);

export default router;
