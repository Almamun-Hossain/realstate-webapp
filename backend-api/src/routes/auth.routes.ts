import express, { Router } from "express";
import { logOut, login, sendPasswordResetEmail } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/auth/login", login);
router.get("/auth/logout", logOut);
router.post("/auth/password-reset-email", sendPasswordResetEmail);
// router.route("/user/register").post(register);

export default router;
