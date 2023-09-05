import CustomError from "../ErrorHandler/customError";
import { IUser, IUserWithID } from "../interface/user.interface";
import UserModel from "../models/user.model";
import httpStatus from "http-status";

export const createUser = async (data: IUser) => {
  return await UserModel.create(data);
};

export const getUsers = async () => {
  let users = await UserModel.find();
  return users;
};

export const getUserByEmail = async (email: string) => {
  let user = await UserModel.findOne({ email });
  if (!user) throw new CustomError("User not found with ${email}", httpStatus.NOT_FOUND);
  return user;
};

export const getUserById = async (id: string) => {
  let user = await UserModel.findById(id);
  if (!user) throw new CustomError("User not found", httpStatus.NOT_EXTENDED);
  return user;
};

export const updateUserById = async (id: string, reqBody: IUser) => {
  let user = await getUserById(id);
  if (!user) throw new CustomError("User not found", httpStatus.NOT_FOUND);
  Object.assign(user, reqBody);
  let update = await UserModel.findByIdAndUpdate(id, reqBody, {
    runValidators: true,
    new: true,
    useFindAndModify: false
  });
  return update;
};

export const deleteUserById = async (id: string) => {
  let user = await getUserById(id);
  if (!user) throw new CustomError("User not found", httpStatus.NOT_FOUND);
  await user.deleteOne();
  return user;
};
