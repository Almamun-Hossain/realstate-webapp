import { Request } from "express";
import { IUserWithID } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";
import { JwtTokenPayload } from "./jwt.interface";

export interface RequestWithUser extends Request {
  user?: IUserWithID;
}
