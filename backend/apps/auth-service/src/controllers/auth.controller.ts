import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  const createUserData = req.body;
  const user = await authService.signUp(createUserData);
  return res.json(user);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.signIn(email, password);
  return res.json(result);
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await authService.generateRefreshToken(token);
  return res.json(result);
};

export const checkCode = async (req: Request, res: Response) => {
  const { userId, code } = req.body;
  const result = await authService.checkCode(userId, code);
  return res.json(result);
};

export const verification = async (req: Request, res: Response) => {
  const { userId, code } = req.body;
  const result = await authService.verificateEmail(userId, code);
  return res.json(result);
};

export const getVerification = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await authService.getEmailVerification(id);
  return res.json(result);
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await authService.forgotPass(email);
  return res.json(result);
};

export const changePassword = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const result = await authService.changePass(userId, password);
  return res.json(result);
};

export const exit = async (req: Request, res: Response) => {
  const { token } = req.body;
  const result = await authService.logout(token);
  return res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId, token } = req.body;
  const result = await authService.deleteProfile(userId, token);
  return res.json(result);
};
