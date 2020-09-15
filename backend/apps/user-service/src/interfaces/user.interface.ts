import { Document } from "mongoose";
import IUserPublic from "./user.public.interface";

interface IUser extends Document {
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  avatarId?: string;
  friendsList?: Array<string>;
  chatsList?: Array<string>;
  confirmed?: boolean;
  last_seen?: Date;
  _id: string;

  //method
  getPublicFields(): IUserPublic;
  verifyPassword(password: string): any;
}

export default IUser;
