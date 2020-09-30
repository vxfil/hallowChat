import { connect } from "ts-nats";
import * as UserService from "../services/user.service";

export default async () => {
  const nats = await connect({ url: `${process.env.NATS_URI}` });
  await nats.on("error", (err) => console.log(err));
  await nats.subscribe("get_users", async (error, message) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const result = await UserService.usersList();
      nats.publish(message.reply, JSON.stringify(result));
      return;
    }
  });

  await nats.subscribe("get_user_by_id", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const id = JSON.parse(message.data).id;
      const result = await UserService.getUserById(id);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe(
    "find_user_by_name",
    async (error: any, message: any) => {
      if (error) {
        console.log(error);
        return;
      }
      if (message.reply) {
        const { name } = JSON.parse(message.data);
        const result = await UserService.getUserByUsername(name);
        return nats.publish(message.reply, JSON.stringify(result));
      }
    }
  );

  await nats.subscribe(
    "find_user_by_email",
    async (error: any, message: any) => {
      if (error) {
        console.log(error);
        return;
      }
      if (message.reply) {
        const email = JSON.parse(message.data).email;
        const result = await UserService.getUserByEmail(email);
        return nats.publish(message.reply, JSON.stringify(result));
      }
    }
  );

  await nats.subscribe("create_user", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const user = JSON.parse(message.data);
      const result = await UserService.createUser(user);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("update_user", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { newData, id } = JSON.parse(message.data);
      const result = await UserService.updateUser(newData, id);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("delete_user", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const id = JSON.parse(message.data).id;
      const result = await UserService.deleteUser(id);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });
};
