import UserModel from "../models/user.model";
import IUser from "../interfaces/user.interface";
import IUserPublic from "../interfaces/user.public.interface";

export const usersList = async (): Promise<IUser[]> => {
  return await await UserModel.find([
    "username",
    "avatar",
    "avatarId",
    "last_seen",
  ]).exec();
};

export const createUser = async (createUserData: any): Promise<IUserPublic> => {
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
  return await UserModel.findOne({ email }).then((data) =>
    data === null ? null : data.verifyPassword(password)
  );
};

export const getUserById = async (id: string): Promise<IUserPublic | null> => {
  return await UserModel.findById(id).then((data) =>
    data === null ? null : data.getPublicFields()
  );
};

export const updateUser = async (
  newUserData: any,
  userId: string
): Promise<IUserPublic | null> => {
  return await UserModel.findByIdAndUpdate(userId, newUserData, {
    new: true,
  }).then((data) => (data === null ? null : data.getPublicFields()));
};

export const deleteUser = async (userId: any): Promise<boolean> => {
  await UserModel.findByIdAndDelete(userId).exec();
  return true;
};
