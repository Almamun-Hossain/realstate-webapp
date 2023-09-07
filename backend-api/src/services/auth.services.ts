import httpStatus from "http-status";
import CustomError from "../ErrorHandler/customError";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import variables from "../config/variables";
import SendEmail from "../utils/SendEmail";

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  let user = await UserModel.findOne({ email });

  if (!user || !(await user.comparePassword(password)))
    throw new CustomError("Icorrect credentials", httpStatus.UNAUTHORIZED);
  return user;
};

export const resetPasswordEmail = async (email: string) => {
  let user = await UserModel.findOne({ email });
  if (!user) throw new CustomError("User doesn't exist", httpStatus.NOT_FOUND);

  let token = user.generatePasswordResetToken();

  await new SendEmail().sendResetPasswordEmail(email, user.name, token);

  await user.save({ validateBeforeSave: false });
  return token;
};

export const resetPassword = async (password: string, token: string) => {
  let resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  let user = await UserModel.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) throw new CustomError("Invalid token value", httpStatus.UNAUTHORIZED);

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return user;
};

export const logOutUser = async (token: string) => {
  let response = jwt.verify(token, variables.jwt.secret);

  return response;
};
