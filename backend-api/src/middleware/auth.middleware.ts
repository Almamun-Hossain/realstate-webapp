import { Request, Response, NextFunction } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import CustomError from "../ErrorHandler/customError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import variables from "../config/variables";
import { userServices } from "../services";
import { JwtTokenPayload } from "../interface/jwt.interface";
import { RequestWithUser } from "../interface/RequestWithUser.interface";

export const isAuthenticated = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let { token } = req.cookies;

  if (!token) throw new CustomError("Please login to access the page", httpStatus.NOT_FOUND);

  let decode = (await jwt.verify(token, variables.jwt.secret)) as JwtTokenPayload;
  let user = await userServices.getUserById(decode.id);
  if (!user) throw new CustomError("Token malfunctioned", httpStatus.UNAUTHORIZED);

  (req as RequestWithUser).user = user;
  next();
});

export const isAdmin = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let user = (req as RequestWithUser).user;
  if (!user) throw new CustomError("You are not authorizes", httpStatus.UNAUTHORIZED);

  if (!user.isAdmin) throw new CustomError("Only admin can access this page", httpStatus.UNAUTHORIZED);
  next();
});
