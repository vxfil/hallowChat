import { connect } from "ts-nats";
import * as AuthService from "../services/auth.service";

export default async () => {
  const nats = await connect({ url: `${process.env.NATS_URI}` });
  await nats.on("error", (err) => console.log(err));

  await nats.subscribe("login", async (error, message) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { email, password } = JSON.parse(message.data);
      const result = await AuthService.signIn(email, password);
      nats.publish(message.reply, JSON.stringify(result));
      return;
    }
  });

  await nats.subscribe("sign_up", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const newUserData = JSON.parse(message.data);
      const result = await AuthService.signUp(newUserData);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("forgot_password", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { email } = JSON.parse(message.data);
      const result = await AuthService.forgotPass(email);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("confirm_email", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const userId = JSON.parse(message.data).userId;
      const result = await AuthService.getEmailVerification(userId);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("verificate_email", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { userId, code } = JSON.parse(message.data);
      const result = await AuthService.verificateEmail(userId, code);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("check_code", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { userId, code } = JSON.parse(message.data);
      const result = await AuthService.checkCode(userId, code);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("change_password", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { userId, password } = JSON.parse(message.data);
      const result = await AuthService.changePass(userId, password);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("refresh_token", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const token = JSON.parse(message.data).token;
      const result = await AuthService.generateRefreshToken(token);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("logout", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const token = JSON.parse(message.data).token;
      const result = await AuthService.logout(token);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });

  await nats.subscribe("delete_profile", async (error: any, message: any) => {
    if (error) {
      console.log(error);
      return;
    }
    if (message.reply) {
      const { userId, token } = JSON.parse(message.data);
      const result = await AuthService.deleteProfile(userId, token);
      return nats.publish(message.reply, JSON.stringify(result));
    }
  });
};
