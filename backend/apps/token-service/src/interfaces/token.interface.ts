import { Document } from "mongoose";

interface IToken extends Document {
  readonly token: string;
  readonly userId: string;
  readonly expiredAt?: Date;
}

export default IToken;
