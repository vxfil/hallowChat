import UserModel from "../models/user.model";
import IUser from "../interfaces/user.interface";
import * as bcrypt from "bcrypt";

export default (UserSchema: any) => {
  async function auth(this: IUser, next: any) {
    if (!this.password) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    console.log(this.password);
    next();
  }

  UserSchema.path("email").validate(async function (value: string) {
    const user = await UserModel.findOne({ email: value });
    if (user) {
      return false;
    }
    return true;
  }, "User with this email already exists");

  UserSchema.path("username").validate(async function (value: string) {
    const user = await UserModel.findOne({ username: value });
    if (user) {
      return false;
    }
    return true;
  }, "User with this username already exists");

  UserSchema.path("password").validate(async function (value: string) {
    if (value.length < 6 || value.length > 20) {
      return false;
    }
    return true;
  }, "Password must contain from 6 to 20 symbols");

  UserSchema.pre("save", auth);
  UserSchema.pre("findByIdAndUpdate", auth);

  UserSchema.methods.getPublicFields = async function () {
    const userArray = Object.entries(this._doc);
    return userArray.reduce((acc, [key, value]) => {
      return key !== "password" ? { ...acc, [key]: value } : acc;
    }, {});
  };

  UserSchema.methods.verifyPassword = async function (password: string) {
    if (await bcrypt.compare(password, this.password)) {
      return { _id: this._id, confirmed: this.confirmed };
    }
    return null;
  };
};
