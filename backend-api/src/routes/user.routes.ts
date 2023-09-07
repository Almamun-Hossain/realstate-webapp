import express from "express";
import { createNewUser, deleteUser, getUserById, getUsers, updateExistUser } from "../controllers/user.controller";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware";
import validateRequest from "../middleware/validateRequest.middleware";
import {
  createUserValidator,
  deleteUserValidator,
  getUserInfoValidator,
  updateUserValidator
} from "../validators/user.validator";
const router = express.Router();

router.route("/users").get(isAuthenticated, getUsers).post(validateRequest(createUserValidator), createNewUser);

router
  .route("/user/:userId")
  .get(validateRequest(getUserInfoValidator), isAuthenticated, getUserById)
  .put(validateRequest(updateUserValidator), isAuthenticated, updateExistUser)
  .delete(validateRequest(deleteUserValidator), isAuthenticated, isAdmin, deleteUser);

export default router;
