import * as AuthService from "../services/auth.service";
import { deleteUser } from "@hallow-backend/user-service/src/services/user.service";
import Redis from "ioredis";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const client = new Redis(`${process.env.REDIS_PORT}`);

const user = {
  username: "user1",
  password: "user12345",
  email: "yulia.perl0v1@gmail.com",
};

let id: string;
let code: any;
let token: any;

describe("Auth Service test", () => {
  test("sign up function should return errors back to the request", async () => {
    const result: any = await AuthService.signUp({
      email: "",
      username: "",
      password: "",
    });

    expect(result).toBeInstanceOf(Error);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.username).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });

  test("sign up function should create user successfully and send mail with code to confirm email", async () => {
    const createdUser = await AuthService.signUp(user);
    id = createdUser._id;

    expect(createdUser.email).toBe(user.email);
    expect(createdUser.username).toBe(user.username);
    expect(createdUser._id).toBeDefined();
  });

  test("sign in function should return mistake because user did not confirm their email before", async () => {
    const result = await AuthService.signIn(user.email, user.password);

    expect(result.confirmed).toBeDefined();
    expect(result.confirmed).toBeFalsy();
  });

  test("verification function must change confirmed status of user from false to true", async () => {
    code = await client.get(id);
    const result = await AuthService.verificateEmail(id, code);

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
  });

  test("sign in function must return access token and refresh token because now user has confirmed status true", async () => {
    const result = await AuthService.signIn(user.email, user.password);
    token = result.refreshToken;

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  test("sign in function must return mistake because we input wrong user data", async () => {
    const result1 = await AuthService.signIn(user.email, "fhrei48230");
    const result2 = await AuthService.signIn("", "");

    expect(result1.error).toBeDefined();
    expect(result2.error).toBeDefined();
  });

  test("refresh token function must return new access token back", async () => {
    const result = await AuthService.generateRefreshToken(token);

    expect(result.accessToken).toBeDefined();
  });

  test("refresh token function must return error because of wrong token", async () => {
    const result = await AuthService.generateRefreshToken("juf3984");

    expect(result.error).toBeDefined();
  });
  test("forgot password function must return error because of not correct email imput", async () => {
    const result: any = await AuthService.forgotPass("");

    expect(result.error).toBeDefined();
  });
  test("forgot password function must generate secret code and send it to email and return user data to client", async () => {
    const result: any = await AuthService.forgotPass(user.email);
    const secretCode = await client.get(id);

    expect(result.username).toBe(user.username);
    expect(secretCode).toBeDefined();
  });

  test("change password function must change password and return user data back", async () => {
    user.password = "user21345";
    const result: any = await AuthService.changePass(id, user.password);

    expect(result.email).toBe(user.email);
    expect(result._id).toStrictEqual(id);
  });

  test("check user password was changed correctly so sign in function must return access and refresh tokens back", async () => {
    const result = await AuthService.signIn(user.email, user.password);

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  test("change password function must return error because of wrong data", async () => {
    const result1: any = await AuthService.changePass("rjfr32", "uyhgfd567i");
    const result2: any = await AuthService.changePass(id, "");

    expect(result1).toBeInstanceOf(Error);
    expect(result2.error).toBeDefined();
  });

  test("logout function must delete refresh token from db so the next time we ask for access token it returns mistake", async () => {
    const logout = await AuthService.logout(token);
    const result = await AuthService.generateRefreshToken(token);
    await deleteUser(id);

    expect(logout).toBeTruthy();
    expect(result.error).toBeDefined();
  });
});
