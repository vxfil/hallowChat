import { model } from "mongoose";
import UserSchema from "../schemas/user.schema";
import IUser from "../interfaces/user.interface";

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
