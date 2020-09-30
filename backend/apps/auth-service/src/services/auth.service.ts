import Redis from "ioredis";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  checkUser,
  updateUser,
  getUserById,
  deleteUser,
} from "@hallow-backend/user-service/src/services/user.service";
import {
  createToken,
  deleteToken,
  findToken,
} from "@hallow-backend/token-service/src/services/token.service";
import code from "../helpers/code.generator";
import { confirmEmail, forgotPassEmail } from "../helpers/mailsender";

import dotenv from "dotenv";
import { Mongoose } from "mongoose";
dotenv.config();

const client = new Redis(`${process.env.REDIS_PORT}`);

export const signIn = async (email: string, password: string) => {
  const user = await checkUser(email, password);
  console.log(user);
  if (!user || user.errors) {
    //console.log(user instanceof Error);
    return { error: "Email or password wasn't correct" };
  }
  if (user.confirmed !== true) {
    return { confirmed: false };
  }

  const payload = { _id: user._id, username: user.username };
  console.log(payload);
  const accessToken = jwt.sign(
    { user: payload },
    `${process.env.ACESS_TOKEN_SECRET}`,
    { expiresIn: "10m" }
  );
  const refreshToken = jwt.sign(
    { user: payload },
    `${process.env.REFRESH_TOKEN_SECRET}`,
    { expiresIn: "7d" }
  );

  await createToken({ token: refreshToken, userId: user._id });
  return { accessToken, refreshToken };
};

export const signUp = async (createUserData: any) => {
  const user: any = await createUser(createUserData);

  if (user.errors) {
    console.log(user instanceof Error);
    return user;
  }

  await getEmailVerification(`${user._id}`);
  return user;
};

export const generateRefreshToken = async (refreshToken: string) => {
  const checkToken = await findToken(refreshToken);
  if (!checkToken) {
    return { error: "Token was expired" };
  }

  const payload = jwt.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`
  );

  const accessToken = jwt.sign(
    { user: payload },
    `${process.env.ACESS_TOKEN_SECRET}`,
    { expiresIn: "10m" }
  );

  return { accessToken };
};

export const checkCode = async (userId: string, code: string) => {
  const rightCode = await client.get(userId);
  return code === rightCode ? true : false;
};

export const verificateEmail = async (userId: string, code: string) => {
  const checked = checkCode(userId, code);
  if (checked) {
    await updateUser({ confirmed: true }, userId);
  }
  return checked;
};

export const getEmailVerification = async (userId: string) => {
  const user: any = await getUserById(userId);
  const verificationCode = code();
  client.setex(userId, 360, verificationCode);

  return await confirmEmail(user.email, verificationCode);
};

export const forgotPass = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User with this email does not exist" };
  }

  const secretCode = code();
  client.setex(`${user._id}`, 360, secretCode);

  await forgotPassEmail(email, secretCode);
  return user;
};

export const changePass = async (userId: string, newPass: string) => {
  return await updateUser({ password: newPass }, userId);
};

export const logout = async (token: string) => {
  return await deleteToken(token);
};

export const deleteProfile = async (userId: string, token: string) => {
  await deleteToken(token);
  return await deleteUser(userId);
};
