import express, { Router } from "express";
import { logOut, login, resetPassword, sendPasswordResetEmail } from "../controllers/auth.controller";
import validateRequest from "../middleware/validateRequest.middleware";
import { loginValidator } from "../validators/auth.validator";

const router: Router = express.Router();

router.post("/auth/login", validateRequest(loginValidator), login);
router.get("/auth/logout", logOut);
router.post("/auth/password-reset-email", sendPasswordResetEmail);
router.post("/reset-password/:token", resetPassword);
// router.route("/user/register").post(register);

export default router;
