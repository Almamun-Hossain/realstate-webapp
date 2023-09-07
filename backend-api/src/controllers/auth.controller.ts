import { CookieOptions, NextFunction, Request, Response } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { authServices } from "../services";
import httpStatus from "http-status";
import variables from "../config/variables";
import SendEmail from "../utils/SendEmail";
import CustomError from "../ErrorHandler/customError";

export const login = handleAsyncError(async (req: Request, res: Response) => {
  let { email, password } = req.body;

  let user = await authServices.loginWithEmailAndPassword(email, password);
  let token = await user.getJwtToken();
  const options: CookieOptions = {
    expires: new Date(Date.now() + variables.cookie.expire * 24 * 60 * 60 * 1000),
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true
  };
  res.cookie("token", token, options).send({ user, token }).status(httpStatus.OK);
});

export const sendPasswordResetEmail = handleAsyncError(async (req: Request, res: Response) => {
  let { email } = req.body;
  let token = await authServices.resetPasswordEmail(email);
  res.json({ success: true, message: "Reset password email has been sent successfully" }).status(httpStatus.OK);
});

export const resetPassword = handleAsyncError(async (req: Request, res: Response) => {
  let { token } = req.params;

  let { password, confirmPassword } = req.body;

  if (password !== confirmPassword) throw new CustomError("Confirm password doesn't match", httpStatus.FORBIDDEN);

  let user = await authServices.resetPassword(password, token);

  res.json({ success: true, message: "Password has been reseted successfully", user }).status(httpStatus.OK);
});

export const logOut = handleAsyncError(async (req: Request, res: Response) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  // let response = await authServices.logOutUser(req.cookies.token);
  res.status(httpStatus.OK).json({ success: true, message: "Logged out successfully!" });
});
