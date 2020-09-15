import { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { colors } from "../enums/color.enum";
import { rolesEnum } from "../enums/role.enum";
import UserMiddleware from "../middlewares/user-schema.middleware";

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
const randomAvatar = () => colors[getRandomInt(colors.length)];

const UserSchema = new Schema(
  {
    email: {
      type: String,
      validate: [isEmail, "Invalid email"],
      required: "Email address is required",
      index: { unique: true },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      index: { unique: true },
      minlength: [3, "Minimum username length 3 characters"],
      maxlength: [20, "Maximum username length 20 characters"],
    },
    password: {
      type: String,
      required: "Password is required",
    },
    avatar: { type: String, default: randomAvatar },
    avatarId: { type: String, default: null },
    friendsList: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    channelsList: {
      type: [Schema.Types.ObjectId],
      ref: "Channel",
      default: [],
    },
    role: {
      type: String,
      enum: Object.values(rolesEnum),
      default: rolesEnum.user,
    },
    confirmed: { type: Boolean, default: false },
    last_seen: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

UserMiddleware(UserSchema);

export default UserSchema;
