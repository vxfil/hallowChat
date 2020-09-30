import { Request, Response } from "express";
import * as NATS from "ts-nats";
import dotenv from "dotenv";

dotenv.config();

const ncUrl = `${process.env.NATS_URI}`;

export const login = async (req: Request, res: Response) => {
  const nc = await NATS.connect(ncUrl);
  nc.on("error", (err) => console.log(err));

  const message = "login";

  const { email, password } = req.body;

  await nc.publish(
    message,
    JSON.stringify({ email, password }),
    `${message}_reply`
  );

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const signUp = async (req: Request, res: Response) => {
  const newUserData = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "sign_up";

  nc.publish(message, JSON.stringify(newUserData), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const forgot = async (req: Request, res: Response) => {
  const { email } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "forgot_password";

  nc.publish(message, JSON.stringify({ email }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const confirm = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const nc = await NATS.connect(ncUrl);

  const message = "confirm_email";

  nc.publish(message, JSON.stringify({ userId }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const verification = async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "verificate_email";

  nc.publish(message, JSON.stringify({ userId, code }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const check = async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "check_code";

  nc.publish(message, JSON.stringify({ userId, code }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const changePass = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "change_password";

  nc.publish(message, JSON.stringify({ userId, password }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "refresh_token";

  nc.publish(message, JSON.stringify({ token }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "logout";

  nc.publish(message, JSON.stringify({ token }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { userId, token } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "delete_profile";

  nc.publish(message, JSON.stringify({ userId, token }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};
