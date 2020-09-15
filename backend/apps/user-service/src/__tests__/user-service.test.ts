import mongoose from "mongoose";
import * as UserService from "../services/user.service";
import dotenv from "dotenv";

dotenv.config();

const user1 = {
  username: "user1",
  email: "user1@gmail.com",
  password: "user1234",
};

let id: string;

describe("User Service Test", () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  test("it should create & save user successfully and give public data back", async () => {
    const savedUser: any = await UserService.createUser(user1);

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(user1.username);
    expect(savedUser.email).toBe(user1.email);
    expect(savedUser.password).toBeUndefined();
  });

  test("it should not create user with username or email that are already on db", async () => {
    const error = await UserService.createUser(user1);

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error).toBeDefined();
  });

  test("it should not create user without required fields", async () => {
    const error: any = await UserService.createUser({ username: "user3" });

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.email).toBeDefined();
  });

  test("it should validate user schema fields and not create user with unique fields", async () => {
    const user: any = await UserService.createUser({
      username: "",
      email: "",
      password: "",
    });
    const user2: any = await UserService.createUser(user1);

    expect(user).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(user.errors.username).toBeDefined();
    expect(user.errors.email).toBeDefined();
    expect(user.errors.password).toBeDefined();

    expect(user2).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(user2.errors.username).toBeDefined();
    expect(user2.errors.email).toBeDefined();
  });

  test("find user by email and show only public fields as username, avatar id, avatar and last seen or if user does not exist get null", async () => {
    const user: any = await UserService.getUserByEmail(user1.email);
    const user2: any = await UserService.getUserByEmail("");

    expect(user.username).toBe(user1.username);
    expect(user.avatarId).toBeDefined();
    expect(user.avatar).toBeDefined();
    expect(user.last_seen).toBeDefined();
    expect(user.password).toBeUndefined();
    expect(user.email).toBeUndefined();

    expect(user2).toBe(null);
  });

  test("find user by username, it is possible to get more than one user with similar start of username or get null if no user was found", async () => {
    const users: any = await UserService.getUserByUsername(user1.username);
    const users2: any = await UserService.getUserByUsername("user2");

    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(users2.length).toEqual(0);
  });

  test("check user inputs username and password are correct", async () => {
    const user: any = await UserService.checkUser(user1.email, user1.password);
    const user2: any = await UserService.checkUser(user1.email, "123");

    id = user._id;
    expect(user._id).toBeDefined();
    expect(user.confirmed).toBeDefined();
    expect(user.password).toBeUndefined();

    expect(user2).toBe(null);
  });

  test("find user by id and show all fields but not password or null in the case if user was not found", async () => {
    const user: any = await UserService.getUserById(id);

    expect(user.username).toBe(user1.username);
    expect(user.email).toBe(user1.email);
    expect(user.password).toBeUndefined();
  });

  test("update user and ignore fields are not in user model, password must be hidden", async () => {
    const password = "1234567";
    const avatarId = "7hfr7385";
    const username = "user2";
    const user: any = await UserService.updateUser(
      { password, username, avatarId, age: 20 },
      id
    );

    expect(user.username).toBe(username);
    expect(user.avatarId).toBe(avatarId);
    expect(user.password).toBeUndefined();
    expect(user.age).toBeUndefined();
  });

  test("delete user", async () => {
    const deleted = await UserService.deleteUser(id);

    expect(deleted).toBeTruthy();
  });
});
