import { Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import variables from "../config/variables";
import { toJSON } from "./plugin/toJSON.plugin";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is missing"]
    },
    email: {
      type: String,
      required: [true, "Email is missing"],
      unique: true, // Ensure the email is unique
      validate: {
        validator: function (v: string) {
          // Use a regular expression to validate email format
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v);
        },
        message: "Please enter a valid email address"
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          // Use a regular expression to validate phone numbers with country codes
          // This example assumes that phone numbers are in the format "+[CountryCode][PhoneNumber]"
          return /^\+[0-9]+[0-9]*$/.test(v);
        },
        message: "Please enter a valid phone number with a country code (e.g., +123456789)"
      }
    },
    password: {
      type: String,
      required: [true, "Password is missing"],
      min: [8, "Password should be mininum 8 character"],
      validate: {
        validator: function (v: string) {
          // Use a regular expression to enforce password requirements
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(v);
          // Minimum length of 8 characters added with {8,}
        },
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, one special character (@#$%^&+=), and be at least 8 characters long"
      },
      private: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      private: true
    },
    resetPasswordToken: { type: String, default: null, private: true },
    resetPasswordExpire: { type: Date, default: null, private: true }
  },
  {
    timestamps: true
  }
);

//use plugin to make json
UserSchema.plugin(toJSON);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 15);
});

UserSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, variables.jwt.secret, { expiresIn: variables.jwt.expire });
};

UserSchema.methods.comparePassword = async function (password: string): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generatePasswordResetToken = function (): string {
  let token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return token;
};

let UserModel = model<IUser>("User", UserSchema);
export default UserModel;
