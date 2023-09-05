import { CookieOptions, NextFunction, Request, Response } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { authServices } from "../services";
import httpStatus from "http-status";
import variables from "../config/variables";
import SendEmail from "../utils/SendEmail";

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
  let token = await authServices.resetUserPassword(email);
  // await new SendEmail().sendResetPasswordEmail(email, "skdfj;lksjf;lksdjf;lsdkjf");
  res.json(token).status(httpStatus.OK);
});

export const logOut = handleAsyncError(async (req: Request, res: Response) => {
  // res.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true
  // });
  let response = await authServices.logOutUser(req.cookies.token);
  res.status(httpStatus.OK).json({ success: true, response, message: "Logged out successfully!" });
});
