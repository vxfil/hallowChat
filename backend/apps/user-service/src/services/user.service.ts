import UserModel from "../models/user.model";
import UserConnection from "../database/user.connection";
import IUser from "../interfaces/user.interface";
import IUserPublic from "../interfaces/user.public.interface";
import hash from "../middlewares/hash";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
UserConnection();

export const usersList = async (): Promise<IUser[]> => {
  return await await UserModel.find([
    "username",
    "avatar",
    "avatarId",
    "last_seen",
  ]).exec();
};

export const createUser = (createUserData: any): Promise<IUserPublic> => {
  const newUser = new UserModel(createUserData);
  return newUser
    .save()
    .then((data) => data.getPublicFields())
    .catch((error: any) => {
      return error;
    });
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email }, [
    "username",
    "avatar",
    "avatarId",
    "last_seen",
  ]).exec();
};

export const getUserByUsername = async (username: string): Promise<IUser[]> => {
  return await UserModel.find(
    {
      username: { $regex: username, $options: "i" },
    },
    ["username", "avatar", "avatarId", "last_seen"]
  ).exec();
};

export const checkUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  return await UserModel.findOne({ email }).then((data) => {
    console.log(data?.password);
    return data === null ? null : data.verifyPassword(password);
  });
};

export const getUserById = async (id: string): Promise<IUserPublic | null> => {
  return await UserModel.findById(id).then((data) =>
    data === null ? null : data.getPublicFields()
  );
};

export const updateUser = async (newUserData: any, userId: string) => {
  const hashedDataPass: any = await hash(newUserData);

  if (hashedDataPass.error) {
    return hashedDataPass;
  }

  return await UserModel.findByIdAndUpdate(userId, hashedDataPass, {
    new: true,
  })
    .then((data) => (data === null ? null : data.getPublicFields()))
    .catch((err) => err);
};

export const deleteUser = async (userId: any): Promise<boolean> => {
  await UserModel.findByIdAndDelete(userId).exec();
  return true;
};
