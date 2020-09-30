import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const usersList = async (req: Request, res: Response) => {
  const users = await UserService.usersList();
  return res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);
  return res.send(result);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await UserService.getUserById(userId);
  return res.json(result);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  const result = await UserService.getUserByUsername(username);
  return res.json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const userId = req.params.id;
  const result = await UserService.updateUser(userData, userId);
  console.log(result);
  return res.json(result);
};

export const checkUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await UserService.checkUser(email, password);
  return res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await UserService.deleteUser(userId);
  return res.json(result);
};
