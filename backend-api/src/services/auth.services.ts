import httpStatus from "http-status";
import CustomError from "../ErrorHandler/customError";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import variables from "../config/variables";
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  let user = await UserModel.findOne({ email });

  if (!user || !(await user.comparePassword(password)))
    throw new CustomError("Icorrect credentials", httpStatus.UNAUTHORIZED);
  return user;
};

export const resetUserPassword = async (email: string) => {
  let user = await UserModel.findOne({ email });
  if (!user) throw new CustomError("User doesn't exist", httpStatus.NOT_FOUND);

  let token = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });
  return token;
};

export const logOutUser = async (token: string) => {
  let response = jwt.verify(token, variables.jwt.secret);
  
  return response;
};
