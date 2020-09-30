import { Schema } from "mongoose";
import { addDays } from "date-fns";

const expireTokenDefault = () => addDays(Date.now(), 7);

const TokenSchema = new Schema({
  token: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiredAt: { type: Date, default: expireTokenDefault },
});

export default TokenSchema;
