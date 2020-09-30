import { Request, Response } from "express";
import * as NATS from "ts-nats";
import dotenv from "dotenv";

dotenv.config();

const ncUrl = `${process.env.NATS_URI}`;

export const usersList = async (req: Request, res: Response) => {
  const nc = await NATS.connect({ url: ncUrl });
  nc.on("error", (err) => console.log(err));
  const message = "get_users";

  await nc.publish(message, message, `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const nc = await NATS.connect(ncUrl);
  const message = "get_user_by_id";

  nc.publish(message, JSON.stringify({ id }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const findByUsername = async (req: Request, res: Response) => {
  const { name } = req.body;

  const nc = await NATS.connect(ncUrl);
  const message = "find_user_by_name";

  nc.publish(message, JSON.stringify({ name }), `${message}_reply`);

  return await nc.subscribe(`${message}_reply`, (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const nc = await NATS.connect(ncUrl);

  nc.publish("create_user", JSON.stringify(user), "create_user_reply");

  return await nc.subscribe("create_user_reply", (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const newData = req.body;
  const userData = { newData, id };

  const nc = await NATS.connect(ncUrl);

  nc.publish("update_user", JSON.stringify(userData), "update_user_reply");

  return await nc.subscribe("update_user_reply", (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  const nc = await NATS.connect(ncUrl);

  nc.publish("delete_user", JSON.stringify({ id }), "delete_user_reply");

  return await nc.subscribe("delete_user_reply", (err, message) => {
    nc.close();
    return res.send(message.data);
  });
};
