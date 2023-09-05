import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  comparePassword(userPassword: string): boolean;
  getJwtToken(): string;
  generatePasswordResetToken():string
}

export interface IUserWithID {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isAdmin: boolean;
}
