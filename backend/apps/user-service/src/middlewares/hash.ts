import IUser from "../interfaces/user.interface";
import bcrypt from "bcrypt";

export default async function (user: IUser) {
  const err = "Password must contain up 6 to 20 symbols";
  if (!user.password) {
    return typeof user.password === 'undefined' ? user : { error: err }
  }
  if (user.password.length < 6 || user.password.length > 20) {
    return { error: err };
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  return user;
}
