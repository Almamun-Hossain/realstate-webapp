import { NextFunction, Request, Response } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import httpStatus from "http-status";
import UserModel from "../models/user.model";
import { userServices } from "../services";
import { RequestWithUser } from "../interface/RequestWithUser.interface";

export const getUsers = handleAsyncError(async (req: Request, res: Response) => {
  let users = await userServices.getUsers();
  return res.json(users).status(httpStatus.OK);
});

export const createNewUser = handleAsyncError(async (req: Request, res: Response) => {
  let users = await userServices.createUser(req.body);
  return res.json(users).status(httpStatus.OK);
});

export const updateExistUser = handleAsyncError(async (req: Request, res: Response) => {
  let user = await userServices.updateUserById(req.params.userId, req.body);
  return res.json(user).status(httpStatus.OK);
});
export const getUserById = handleAsyncError(async (req: Request, res: Response) => {
  let user = await userServices.getUserById(req.params.userId);
  return res.json(user).status(httpStatus.OK);
});
export const deleteUser = handleAsyncError(async (req: Request, res: Response) => {
  console.log((req as RequestWithUser).user);
  let user = await userServices.deleteUserById(req.params.userId);
  return res.json(user).status(httpStatus.OK);
});
