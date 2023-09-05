import { Request, Response, NextFunction } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import CustomError from "../ErrorHandler/customError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import variables from "../config/variables";
import { userServices } from "../services";
import { JwtTokenPayload } from "../interface/jwt.interface";
import { IUserWithID } from "../interface/user.interface";

export const isAuthenticated = handleAsyncError(async (req: Request<IUserWithID>, res: Response, next: NextFunction) => {
  let { token } = req.cookies;

  if (!token) throw new CustomError("JWT token not found", httpStatus.NOT_FOUND);

  let decode = (await jwt.verify(token, variables.jwt.secret)) as JwtTokenPayload;
  let user = await userServices.getUserById(decode.id);
  if (!user) throw new CustomError("Token malfunctioned", httpStatus.UNAUTHORIZED);
//   req.user = user;
  next();
});
