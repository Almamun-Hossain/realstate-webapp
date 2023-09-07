import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;
  comparePassword(userPassword: string): boolean;
  getJwtToken(): string;
  generatePasswordResetToken(): string;
}

export interface IUserWithID {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isAdmin: boolean;
}
